import Config from 'react-native-config';
import { GoogleSignin, User, statusCodes } from 'react-native-google-signin';
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import { takeLatest, call, put, CallEffect } from 'redux-saga/effects';
import { LoginManager, AccessToken, LoginResult } from "react-native-fbsdk";

import { AuthSagaActions } from '@app/state/auth/types';
import { UserDataResponse } from '@app/api/accountService/accountService';
import { navigationService } from '@app/services';
import { FacebookDataResult } from '@app/api/facebookLoginService/facebookLoginService';
import { authActionsCreators } from '@app/state/auth/actions';
import { getUserDataWithTokenFlow } from '../userAccountSaga/userAccountSaga';
import { keyToString, mapDataToResponse } from '../utils/utils';
import { facebookLoginService, accountService } from '@app/api';

export const TOKEN_KEY: string = 'USER_TOKEN';

export interface UserData {
    id: string;
    name: string;
    photo: string;
    description?: string;
};

export const configureGoogle: { [key in 'android' | 'ios']: () => Iterable<CallEffect> } = {
    ios: function* () {
        try {
            yield call(
                [GoogleSignin, GoogleSignin.configure],
                { iosClientId: Config.KEYSTORE_IOSCLIENT_ID }
            );
        } catch (err) {
            return err;
        }
    },
    android: function* () {
        try {
            yield call(
                [GoogleSignin, GoogleSignin.configure],
                { webClientId: Config.KEYSTORE_WEBCLIENT_ID }
            );
        } catch (err) {
            return err;
        }
    }
};

export function* setSecureStoredKey(key: string, token: string) {
    try {
        yield call(
            [RNSecureKeyStore, RNSecureKeyStore.set],
            key, token, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY }
        );
    } catch (err) {
        return err;
    }
}

export function* facebookLoginFlow() {
    try {
        const facebookLoginResponse: LoginResult = yield call(
            [LoginManager, LoginManager.logInWithReadPermissions],
            ['public_profile', 'email']
        );

        if (!facebookLoginResponse.isCancelled) {
            const accessTokenResult: AccessToken = yield call(
                [AccessToken, AccessToken.getCurrentAccessToken]
            );

            const accessToken: string = yield keyToString(accessTokenResult, 'accessToken');
            const facebookUserData: FacebookDataResult = yield call(
                [facebookLoginService, facebookLoginService.getFacebookData]
            );

            yield put(authActionsCreators.startRequest());

            const userDataResponse: UserDataResponse = yield call(
                [accountService, accountService.sendUserData],
                mapDataToResponse(facebookUserData, 'facebook', accessToken)
            );

            yield call(setSecureStoredKey, TOKEN_KEY, userDataResponse.token);

            yield put(authActionsCreators.setToken(userDataResponse.token));
            yield put(authActionsCreators.requestSuccess());

            yield navigationService.navigate('App');
        }
    } catch (err) {
        yield put(authActionsCreators.requestFail('Error when loggin in to Facebook.'));
    }
}

export function* googleLoginFlow() {
    try {
        yield call(
            [GoogleSignin, GoogleSignin.hasPlayServices]
        );

        yield put(authActionsCreators.startRequest());

        const userInfo: User = yield call(
            [GoogleSignin, GoogleSignin.signIn]
        );

        const token = yield keyToString(userInfo, 'idToken');

        const userDataResponse: UserDataResponse = yield call(
            [accountService, accountService.sendUserData],
            mapDataToResponse(userInfo.user, 'google', token)
        );

        yield call(setSecureStoredKey, TOKEN_KEY, userDataResponse.token);

        yield put(authActionsCreators.setToken(userDataResponse.token));
        yield put(authActionsCreators.requestSuccess());

        yield navigationService.navigate('App');
    } catch (err) {
        if (err.code === statusCodes.SIGN_IN_CANCELLED)
            yield put(authActionsCreators.requestSuccess());
        else
            yield put(authActionsCreators.requestFail('Error when loggin in to Google Account.'));
    }
}

export function* loginSaga() {
    yield takeLatest(AuthSagaActions.FACEBOOK_LOGIN, facebookLoginFlow);
    yield takeLatest(AuthSagaActions.GOOGLE_LOGIN, googleLoginFlow);
}