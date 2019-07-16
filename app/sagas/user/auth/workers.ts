import {AccessToken, LoginManager, LoginResult} from "react-native-fbsdk";
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import {all, call, put} from "redux-saga/effects";
import {UserDataRequest, UserDataResponse} from "@app/api/accountService/accountService";
import {FacebookDataResult} from "@app/api/facebookLoginService/facebookLoginService";
import {accountService, facebookLoginService} from "@app/api";
import {authActionsCreators} from "@app/state/auth/actions";

import {navigationService} from "@app/services";
import {GoogleSignin, User} from "react-native-google-signin";

import {requestAction} from "@app/sagas/common/requests";
import pushNotificationService from "@app/api/pushNotificationService/pushNotificationService";
import Config from "react-native-config";
import {profileActionsCreators} from "@app/state/profile/actions";
import {lunchesActionsCreators} from "@app/state/lunches/actions";
import {lunchesSagaTriggers} from "@app/sagas/lunches/actions";
import {profileSagaTriggers} from "@app/sagas/user/profile/actions";

export const TOKEN_KEY: string = 'USER_TOKEN';

export function* removeSecureStoredKey(key: string) {
    try {
        yield call([RNSecureKeyStore, RNSecureKeyStore.remove], key);
    } catch (err) {
        console.info(err);
    }
}

export function* setSecureStoredKey(key: string, token: string) {
    try {
        yield call(
            [RNSecureKeyStore, RNSecureKeyStore.set],
            key,
            token,
            {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY });
    } catch (err) {
        console.info(err);
    }
}

export function* getSecureStoredKey(key: string) {
    try {
        const token: string = yield call([RNSecureKeyStore, RNSecureKeyStore.get], key);
        return token;
    } catch (err) {
        console.info(err);
    }
}

export function* authenticate(token: string) {
    yield call(setSecureStoredKey, TOKEN_KEY, token);
    yield put(authActionsCreators.setToken(token));
    yield put(profileSagaTriggers.getProfile());
    yield put(lunchesSagaTriggers.getLunches());
}

export function * initializeAuthenticationSaga() {
    try {
        const token: string = yield call(getSecureStoredKey, TOKEN_KEY);

        if(token) {
            yield call(authenticate, token);
        }

    } catch (err) {
        yield put(authActionsCreators.setToken(null));
    }

    yield put(authActionsCreators.defineAuthState());
}

export function* loginFacebookSaga() {
    try {
        yield call(requestAction, authActionsCreators.loginSetRequestStatus, call(function* () {
            const facebookLoginResponse: LoginResult = yield call(
                [LoginManager, LoginManager.logInWithReadPermissions],
                ['public_profile', 'email']
            );

            if (!facebookLoginResponse.isCancelled) {
                const accessTokenResult: AccessToken = yield call([AccessToken, AccessToken.getCurrentAccessToken]);

                const accessToken: string = accessTokenResult.accessToken;
                const facebookUserData: FacebookDataResult = yield call(
                    [facebookLoginService, facebookLoginService.getFacebookData]
                );
                const accountData: UserDataRequest = {
                    loginProvider: 'facebook',
                    loginProviderToken: accessToken,
                    id: facebookUserData.id,
                    deviceId: pushNotificationService.getDeviceIdToken()
                };

                const userDataResponse: UserDataResponse = yield call(
                    [accountService, accountService.sendUserData],
                    accountData
                );

                yield call(authenticate, userDataResponse.token);
                yield navigationService.navigate('App');
            }
        }));

    } catch (err) {
        console.info('Error when loggin in to Facebook.');
    }
}

export function* loginGoogleSaga() {
    try {
        yield call(requestAction, authActionsCreators.loginSetRequestStatus, call(function* () {
            yield call([GoogleSignin, GoogleSignin.configure], { webClientId: Config.GOOGLE_WEB_CLIENT_ID });
            yield call([GoogleSignin, GoogleSignin.hasPlayServices]);

            const userInfo: User = yield call([GoogleSignin, GoogleSignin.signIn]);
            const accessToken = userInfo.idToken;
            const accountData: UserDataRequest =  {
                loginProvider: 'google',
                loginProviderToken: accessToken,
                id: userInfo.user.id,
                deviceId: pushNotificationService.getDeviceIdToken()
            };

            const userDataResponse: UserDataResponse = yield call(
                [accountService, accountService.sendUserData],
                accountData
            );

            yield call(authenticate, userDataResponse.token);
            yield navigationService.navigate('App');
        }))
    } catch (err) {
        console.info('Error when loggin in to Google Account.');
    }
}

export function* logoutSaga() {
    try {

        yield call(requestAction, authActionsCreators.logoutSetRequestStatus, call(function* () {

            const {loggedInFb, loggedInGoogle} = yield all({
                loggedInFb: call([AccessToken, AccessToken.getCurrentAccessToken]),
                loggedInGoogle: call([GoogleSignin, GoogleSignin.isSignedIn])
            });

            yield call(removeSecureStoredKey, TOKEN_KEY);

            if (loggedInFb) {
                yield call([LoginManager, LoginManager.logOut]);
            }

            if (loggedInGoogle) {
                yield call([GoogleSignin, GoogleSignin.signOut]);
            }

            yield put(profileActionsCreators.setProfile(null));
            yield put(authActionsCreators.setToken(null));
            yield navigationService.navigate('Auth');
        }));
    } catch (err) {
        console.info('Error when trying to logout.');
    }
}