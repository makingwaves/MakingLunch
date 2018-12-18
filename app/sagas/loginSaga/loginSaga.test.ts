import { Platform } from 'react-native';
import { call, put } from 'redux-saga/effects';
import { GoogleSignin, User } from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import * as loginSaga from './loginSaga';

import { AuthActions } from '../../state/auth/types';
import { authActionsCreators } from '../../state/auth/actions';

import { navigationService } from '../../services';
import { facebookLoginService, accountService } from '../../api';
import { FacebookDataResult } from '../../api/facebookLoginService/facebookLoginService';
import { UserDataResponse } from '../../api/accountService/accountService';

jest.mock('react-native-google-signin', () => ({
    GoogleSignin: {
        hasPlayServices: () => true,
        signIn: () => ({ })
    }
}));

describe('loginSaga', () => {

    describe('Utils', () => {
        const correctObject = {
            name: 'MyName',
            surname: 123
        };
        const inCorrectObject = 'MyName';

        describe('hasKey Function', () => {
            it('should return true, when given object has key', () => {
                expect(loginSaga.hasKey(correctObject, 'name'))
                    .toBeTruthy();
            });

            it('should return false, when given object does not have key', () => {
                expect(loginSaga.hasKey(correctObject, 'notMyName'))
                    .toBeFalsy();
                expect(loginSaga.hasKey(correctObject, (123 as any)))
                    .toBeFalsy();
            });

            it('should return false, when args are incorrect', () => {
                expect(loginSaga.hasKey(inCorrectObject, 'notMyName'))
                    .toBeFalsy();
                expect(loginSaga.hasKey(inCorrectObject, (123 as any)))
                    .toBeFalsy();
                expect(loginSaga.hasKey(inCorrectObject, (true as any)))
                    .toBeFalsy();
            });
        });

        describe('keyToString Function', () => {
            it('should transform key value to string', () => {
                expect(typeof loginSaga.keyToString(correctObject, 'name'))
                    .toBe('string');
                expect(typeof loginSaga.keyToString(correctObject, 'surname'))
                    .toBe('string');
            });

            it('should return undefined if given object does not have key', () => {
                expect(loginSaga.keyToString(correctObject, 'notMySurname'))
                    .toBeUndefined();
            });

            it('should return undefined, when args are incorrect', () => {
                expect(loginSaga.keyToString(inCorrectObject, 'notMyName'))
                    .toBeUndefined();
                expect(loginSaga.keyToString(undefined, null))
                    .toBeUndefined();
            });
        });

        describe('mapDataToResponse Function', () => {
            it('should return object with empty string values', () => {
                const data = {};
                const expected = {
                    name: '',
                    photo: '',
                    description: '',
                    loginProvider: 'facebook',
                    loginProviderToken: '123',
                    id: ''
                };

                expect(loginSaga.mapDataToResponse(data as any, 'facebook', expected.loginProviderToken))
                    .toEqual(expected);
            });
        });
    });
    
    describe('facebookLoginFlow', () => {
        let facebookFlowGen: IterableIterator<any>;

        
        describe('Error has occured durning authorization', () => {
            beforeEach(() => {
                facebookFlowGen = loginSaga.facebookLoginFlow();
                facebookFlowGen.next();
            });
            
            it(`should put ${AuthActions.REQUEST_FAIL} with custom error message`, () => {
                expect(facebookFlowGen.throw({}).value)
                    .toEqual(
                        put(authActionsCreators.requestFail('Error when loggin in to Facebook.'))
                    );
            });

            it(`should put ${AuthActions.REQUEST_FAIL} with given error message`, () => {
                const error = {
                    message: 'Given error.'
                };  
                expect(facebookFlowGen.throw(error).value)
                    .toEqual(
                        put(authActionsCreators.requestFail(error.message))
                    );
            });
        });

        describe('User has cancelled authentication', () => {
            beforeAll(() => {
                facebookFlowGen = loginSaga.facebookLoginFlow();
            });

            it('should call logInWithReadPermissions function with success', () => {
                expect(facebookFlowGen.next().value)
                    .toEqual(
                        call(
                            [LoginManager, LoginManager.logInWithReadPermissions],
                            ['public_profile', 'email']
                        )
                    );
            });

            it('generator should be done, after cancellation', () => {
                const response = {
                    isCancelled: true
                };

                expect(facebookFlowGen.next(response).done)
                    .toBeTruthy();
            });
        });

        describe('User has been authorized', () => {
            const accessTokenResponse = {
                accessToken: 'myToken'
            };
            const facebookUserData: FacebookDataResult = {
                id: '1',
                name: 'My Name',
                photo: 'photo',
                description: 'description'
            };
            const userDataResponse: UserDataResponse = {
                isNewUser: false,
                token: 'Token123'
            };

            beforeAll(() => {
                facebookFlowGen = loginSaga.facebookLoginFlow();
            });

            it('should call logInWithReadPermissions function with success', () => {
                expect(facebookFlowGen.next().value)
                    .toEqual(
                        call(
                            [LoginManager, LoginManager.logInWithReadPermissions],
                            ['public_profile', 'email']
                        )
                    );
            });

            it('should call getCurrentAccessToken function and map AccessTokenToString with success', () => {
                const withReadPermissionResponse = {
                    isCancelled: false
                };

                const getAccessTokenGen = facebookFlowGen.next(withReadPermissionResponse);
                const accessTokenResultGen = facebookFlowGen.next(accessTokenResponse);

                expect(getAccessTokenGen.done)
                    .toBeFalsy();
                expect(getAccessTokenGen.value)
                    .toEqual(
                        call(
                            [AccessToken, AccessToken.getCurrentAccessToken]
                        )
                    );
            });

            it('should call getFacebookData function with success', () => {
                expect(facebookFlowGen.next(accessTokenResponse.accessToken).value)
                    .toEqual(
                        call([
                            facebookLoginService, facebookLoginService.getFacebookData
                        ])
                    );
            });

            it('should call sendUserData with success', () => {
                expect(facebookFlowGen.next(facebookUserData).value)
                    .toEqual(
                        call(
                            [accountService, accountService.sendUserData],
                            loginSaga.mapDataToResponse(facebookUserData, 'facebook', accessTokenResponse.accessToken)
                        )
                    );
            });

            it('should call reducer and setProfile to state', () => {
                expect(facebookFlowGen.next(userDataResponse).value)
                    .toEqual(
                        put(authActionsCreators.setProfile(loginSaga.getProfileData(facebookUserData, userDataResponse)))
                    );
            });

            it('should call reducer and setToken to state', () => {
                expect(facebookFlowGen.next().value)
                    .toEqual(
                        put(authActionsCreators.setToken(userDataResponse.token))
                    );
            });

            it('should redirect to App route after successful authorization', () => {
                navigationService.navigate = jest.fn((route) => ({ }));

                const navigateGen = facebookFlowGen.next().value;

                expect(navigateGen)
                    .toEqual({});
                expect(navigationService.navigate)
                    .toHaveBeenCalledWith('App');
                expect(facebookFlowGen.next().done)
                    .toBeTruthy();
            });
        });
    });

    describe('googleLoginFlow', () => {
        let googleFlowGen: IterableIterator<any>;

        describe('Error has occured durning authorization', () => {
            beforeEach(() => {
                googleFlowGen = loginSaga.googleLoginFlow();
                googleFlowGen.next();
            });
            
            it(`should put ${AuthActions.REQUEST_FAIL} with custom error message`, () => {
                expect(googleFlowGen.throw({}).value)
                    .toEqual(
                        put(authActionsCreators.requestFail('Error when loggin in to Google Account.'))
                    );
            });

            it(`should put ${AuthActions.REQUEST_FAIL} with given error message`, () => {
                const error = {
                    message: 'Given error.'
                };  
                expect(googleFlowGen.throw(error).value)
                    .toEqual(
                        put(authActionsCreators.requestFail(error.message))
                    );
            }); 
        });

        describe('User has been authorized', () => {
            let userData: User = {
                user: {
                    id: '1',
                    name: 'MyName',
                    email: 'MyEmail@email.com',
                    photo: 'Photo',
                    familyName: 'FamilyName',
                    givenName: 'GivenName'
                },
                idToken: 'IDTOKEN123',
                accessToken: 'ACCESSTOKEN123',
                serverAuthCode: null,
                accessTokenExpirationDate: null
            };

            beforeAll(() => {
                googleFlowGen = loginSaga.googleLoginFlow();
            });

            it('should configure google module', () => {
                expect(googleFlowGen.next().value)
                    .toEqual(
                        call(
                            loginSaga.configureGoogle[Platform.OS]
                        )
                    );
            });

            it('should check if user has any google services', () => {
                expect(googleFlowGen.next().value)
                    .toEqual(
                        call(
                            [GoogleSignin, GoogleSignin.hasPlayServices]
                        )
                    );
            });

            it('should signIn user, get his data from google account and save idToken', () => {
                expect(googleFlowGen.next().value)
                    .toEqual(
                        call(
                            [GoogleSignin, GoogleSignin.signIn]
                        )
                    );
                expect(googleFlowGen.next(userData).value)
                    .toEqual(
                        loginSaga.keyToString(userData, 'idToken')
                    )
            });

            it('should call sendUserData with success', () => {
                expect(googleFlowGen.next(userData.idToken).value)
                    .toEqual(
                        call(
                            [accountService, accountService.sendUserData],
                            loginSaga.mapDataToResponse(userData.user, 'google', userData.idToken)
                        )
                    );
            });

            it('should put profile data in to state', () => {
                const userDataResponse: UserDataResponse = {
                    isNewUser: false,
                    token: userData.idToken
                };

                expect(googleFlowGen.next(userDataResponse).value)
                    .toEqual(
                        put(authActionsCreators.setProfile(loginSaga.getProfileData(userData.user, userDataResponse)))
                    );
            });

            it('should put user data in to state', () => {
                expect(googleFlowGen.next().value)
                    .toEqual(
                        put(authActionsCreators.setToken(userData.idToken))
                    );
            });

            it('should redirect to App route after successful authorization', () => {
                navigationService.navigate = jest.fn((route) => ({ }));

                const navigateGen = googleFlowGen.next().value;

                expect(navigateGen)
                    .toEqual({});
                expect(navigationService.navigate)
                    .toHaveBeenCalledWith('App');
                expect(googleFlowGen.next().done)
                    .toBeTruthy();
            });
        });
    });
});