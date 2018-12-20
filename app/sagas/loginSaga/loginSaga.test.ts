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
import { mapDataToResponse, keyToString } from '../utils/pureFn/pureFn';

jest.mock('react-native-google-signin', () => ({
    GoogleSignin: {
        hasPlayServices: () => true,
        signIn: () => ({ })
    }
}));

describe('loginSaga', () => {
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

            it('should start request action', () => {
                expect(facebookFlowGen.next(facebookUserData).value)
                    .toEqual(
                        put(authActionsCreators.startRequest())
                    );
            })

            it('should call sendUserData with success ', () => {
                expect(facebookFlowGen.next().value)
                    .toEqual(
                        call(
                            [accountService, accountService.sendUserData],
                            mapDataToResponse(facebookUserData, 'facebook', accessTokenResponse.accessToken)
                        )
                    );
            });

            it('should call reducer and setToken to state', () => {
                expect(facebookFlowGen.next(userDataResponse).value)
                    .toEqual(
                        put(authActionsCreators.setToken(userDataResponse.token))
                    );
            });

            it('should stop request action with success', () => {
                expect(facebookFlowGen.next().value)
                    .toEqual(
                        put(authActionsCreators.requestSuccess())
                    );
            })

            it('should redirect to App ( when user is not a newUser ) route after successful authorization', () => {
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
                        keyToString(userData, 'idToken')
                    )
            });

            it('should start request action', () => {
                expect(googleFlowGen.next(userData.idToken).value)
                    .toEqual(
                        put(authActionsCreators.startRequest())
                    );
            });

            it('should call sendUserData with success', () => {
                expect(googleFlowGen.next().value)
                    .toEqual(
                        call(
                            [accountService, accountService.sendUserData],
                            mapDataToResponse(userData.user, 'google', userData.idToken)
                        )
                    );
            });

            it('should put user token in to state', () => {
                const userDataResponse: UserDataResponse = {
                    isNewUser: false,
                    token: userData.idToken
                };
                expect(googleFlowGen.next(userDataResponse).value)
                    .toEqual(
                        put(authActionsCreators.setToken(userData.idToken))
                    );
            });

            it('should stop request action with success', () => {
                expect(googleFlowGen.next().value)
                    .toEqual(
                        put(authActionsCreators.requestSuccess())
                    );
            });

            it('should redirect to App route ( when user is not a newUser ) after successful authorization', () => {
                navigationService.navigate = jest.fn((route: string) => ({ }));

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