import { takeLatest, call, put, CallEffect } from 'redux-saga/effects';
import { LoginManager, AccessToken, LoginResult } from "react-native-fbsdk";
import { GoogleSignin, User } from 'react-native-google-signin';
import Config from 'react-native-config';
import { Platform } from 'react-native';
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

import { AuthSagaActions } from '../../state/auth/types';
import { authActionsCreators } from '../../state/auth/actions';

import { navigationService } from '../../services';
import { FacebookDataResult } from '../../api/facebookLoginService/facebookLoginService';
import { UserDataResponse } from '../../api/accountService/accountService';
import { facebookLoginService, accountService } from '../../api';

import { keyToString, mapDataToResponse, hasKey } from '../utils/pureFn/pureFn';

export const TOKEN_KEY: string = 'USER_TOKEN'; 

export interface UserData {
    name: string;
    photo: string;
    id: string;
    description?: string;
};

export const configureGoogle: { [key in 'android' | 'ios']: () => Iterable<CallEffect> } = {
    ios: function* () {
        try {
            yield call(
                [GoogleSignin, GoogleSignin.configure],
                { iosClientId: Config.KEYSTORE_IOSCLIENT_ID }
            );
        } catch(err) {
            return err;
        }
    },
    android: function* () {
        try {
            yield call(
                [GoogleSignin, GoogleSignin.configure],
                { webClientId: Config.KEYSTORE_WEBCLIENT_ID }
            ); 
        } catch(err) {
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
    } catch(err) {
        return err;
    }
}

export function* facebookLoginFlow() {
    try {
        const facebookLoginResponse: LoginResult = yield call(
            [LoginManager, LoginManager.logInWithReadPermissions],
            ['public_profile', 'email']
        );
        
        if(!facebookLoginResponse.isCancelled) {
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

            yield navigationService.navigate(userDataResponse.isNewUser ? 'UserProfile' : 'App');
        }
    } catch(err) {
        yield put(authActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when loggin in to Facebook.'));
    }
}

export function* googleLoginFlow() {
    try {
        yield call(
            [GoogleSignin, GoogleSignin.hasPlayServices]
        );

        const userInfo: User = yield call(
            [GoogleSignin, GoogleSignin.signIn]
        );
        const token = yield keyToString(userInfo, 'idToken');

        yield put(authActionsCreators.startRequest());

        const userDataResponse: UserDataResponse = yield call(
            [accountService, accountService.sendUserData],
            mapDataToResponse(userInfo.user, 'google', token)
        );

        yield call(setSecureStoredKey, TOKEN_KEY, userDataResponse.token);
        yield put(authActionsCreators.setToken(userDataResponse.token));
        yield put(authActionsCreators.requestSuccess());

        yield navigationService.navigate(userDataResponse.isNewUser ? 'UserProfile' : 'App');
    } catch(err) {
        yield put(authActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when loggin in to Google Account.'));
    } 
}

export function* loginSaga() {
    yield takeLatest(AuthSagaActions.FACEBOOK_LOGIN, facebookLoginFlow);
    yield takeLatest(AuthSagaActions.GOOGLE_LOGIN, googleLoginFlow);
}