import { takeLatest, call, put, CallEffect } from 'redux-saga/effects';
import { LoginManager, AccessToken, LoginResult } from "react-native-fbsdk";
import { GoogleSignin, User } from 'react-native-google-signin';
import Config from 'react-native-config';
import { Platform } from 'react-native';

import { AuthActions, Profile } from '../../state/auth/types';
import { authActionsCreators } from '../../state/auth/actions';

import { navigationService } from '../../services';
import { FacebookDataResult } from '../../api/facebookLoginService/facebookLoginService';
import { UserDataResponse, UserDataRequest } from '../../api/accountService/accountService';
import { facebookLoginService, accountService } from '../../api';

interface UserData {
    name: string;
    photo: string;
    id: string;
    description?: string;
};

export const hasKey = <T>(str: T, key: string): boolean => !!(str && str[key]);
export const keyToString = <T>(str: T, key: string): string => str && str[key] && str[key].toString();

export const mapDataToResponse = (userData: UserData, provider: 'facebook' | 'google', token: string): UserDataRequest => ({
    name: userData.name || '',
    photo: userData.photo || '',
    description: userData.description || '',
    loginProvider: provider,
    loginProviderToken: token,
    id: userData.id || ''
});

export const getProfileData = <T extends UserData>(data: T, userResponse: UserDataResponse): Profile => ({
    id: data.id,
    name: data.name,
    photo: data.photo,
    description: data.description,
    isNewUser: userResponse.isNewUser
});

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

            const userDataResponse: UserDataResponse = yield call(
                [accountService, accountService.sendUserData],
                mapDataToResponse(facebookUserData, 'facebook', accessToken)
            );

            yield put(authActionsCreators.setProfile(getProfileData(facebookUserData, userDataResponse)));
            yield put(authActionsCreators.setToken(userDataResponse.token));

            yield navigationService.navigate('App');
        }
    } catch(err) {
        yield put(authActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when loggin in to Facebook.'));
    }
}

export function* googleLoginFlow() {
    try {
        yield call(
            configureGoogle[Platform.OS]
        );

        yield call(
            [GoogleSignin, GoogleSignin.hasPlayServices]
        );

        const userInfo: User = yield call(
            [GoogleSignin, GoogleSignin.signIn]
        );

        const token = yield keyToString(userInfo, 'idToken');

        const userDataResponse: UserDataResponse = yield call(
            [accountService, accountService.sendUserData],
            mapDataToResponse(userInfo.user, 'google', token)
        );

        yield put(authActionsCreators.setProfile(getProfileData(userInfo.user, userDataResponse)));
        yield put(authActionsCreators.setToken(userDataResponse.token));

        yield navigationService.navigate('App');
    } catch(err) {
        yield put(authActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when loggin in to Google Account.'));
    } 
}

export function* loginSaga() {
    yield takeLatest(AuthActions.FACEBOOK_LOGIN, facebookLoginFlow);
    yield takeLatest(AuthActions.GOOGLE_LOGIN, googleLoginFlow);
}