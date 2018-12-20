import { put, all, call } from 'redux-saga/effects';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

import * as logoutSaga from './logoutSaga';

import { AuthActions } from '../../state/auth/types';
import { authActionsCreators } from '../../state/auth/actions';
import { navigationService } from '../../services';

jest.mock('react-native-google-signin', () => ({
    GoogleSignin: {
        isSignedIn: () => ({ }),
        signOut: () => ({ })
    }
}));

describe('logoutSaga', () => {
    
    describe('logoutFlow', () => {
        let logoutGen: IterableIterator<any>;
        
        describe('Error has occured when trying to logout', () => {
            beforeEach(() => {
                logoutGen = logoutSaga.logoutFlow();
                logoutGen.next();
            });
            
            it(`should put ${AuthActions.REQUEST_FAIL} with custom error message`, () => {
                expect(logoutGen.throw({}).value)
                    .toEqual(
                        put(authActionsCreators.requestFail('Error when trying to logout.'))
                    );
            });

            it(`should put ${AuthActions.REQUEST_FAIL} with given error message`, () => {
                const error = {
                    message: 'Given error.'
                };  
                expect(logoutGen.throw(error).value)
                    .toEqual(
                        put(authActionsCreators.requestFail(error.message))
                    );
            }); 
        });

        describe('User has logged out', () => {
            beforeAll(() => {
                logoutGen = logoutSaga.logoutFlow();
            });

            it('should call both google and facebook methods to check if user is logged in', () => {
                expect(logoutGen.next().value)
                    .toEqual(
                        all({
                            loggedInFb: call([AccessToken, AccessToken.getCurrentAccessToken]),
                            loggedInGoogle: call([GoogleSignin, GoogleSignin.isSignedIn])
                        })
                    );
            });

            it('should call logout function from Facebook API', () => {
                expect(logoutGen.next({ loggedInFb: true, loggedInGoogle: true }).value)
                    .toEqual(
                        call( 
                            [LoginManager, LoginManager.logOut]
                        )
                    )
            });

            it('should call logout function from Google API', () => {
                expect(logoutGen.next().value)
                    .toEqual(
                        call( 
                            [GoogleSignin, GoogleSignin.signOut]
                        )
                    )
            });

            it('should put null as profile and token in to store', () => {
                expect(logoutGen.next().value)
                    .toEqual(
                        put(authActionsCreators.setProfile(null))
                    );
                expect(logoutGen.next().value)
                    .toEqual(
                        put(authActionsCreators.setToken(null))
                    );
            });

            it('should redirect to Auth route', () => {
                navigationService.navigate = jest.fn((route: string) => ({ }));

                const navigateGen = logoutGen.next().value;

                expect(navigateGen)
                    .toEqual({});
                expect(navigationService.navigate) 
                    .toHaveBeenCalledWith('Auth');
                expect(logoutGen.next().done)
                    .toBeTruthy();
            });
        });
    });
});