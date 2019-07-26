
import RNSecureKeyStore from "react-native-secure-key-store";
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { takeLatest, put, all, call } from 'redux-saga/effects';

import { TOKEN_KEY } from '../loginSaga/loginSaga';
import { AuthSagaActions } from '@app/state/auth/types';
import { navigationService } from '@app/services';
import { authActionsCreators } from '@app/state/auth/actions';
import { appMessagesActionsCreators } from '@app/state/app_messages/actions';

export function* removeSecureStoredKey(key: string) {
    try {
        yield call(
            [RNSecureKeyStore, RNSecureKeyStore.remove],
            key
        );
    } catch (err) {
        return err;
    }
}

export function* logoutFlow() {
    try {
        yield put(authActionsCreators.startRequest());

        const { loggedInFb, loggedInGoogle } = yield all({
            loggedInFb: call([AccessToken, AccessToken.getCurrentAccessToken]),
            loggedInGoogle: call([GoogleSignin, GoogleSignin.isSignedIn])
        });

        yield call(removeSecureStoredKey, TOKEN_KEY);

        if (loggedInFb)
            yield call(
                [LoginManager, LoginManager.logOut]
            );
        if (loggedInGoogle)
            yield call(
                [GoogleSignin, GoogleSignin.signOut]
            );

        yield put(authActionsCreators.setProfile(null));
        yield put(authActionsCreators.setToken(null));

        yield put(authActionsCreators.requestSuccess());

        yield navigationService.navigate('Auth');
    } catch (err) {
        yield put(appMessagesActionsCreators.showErrorMessage({ title: "Logout error", message: 'Error when trying to logout.' }));
        yield put(authActionsCreators.requestFail());
    }
}

export function* logoutSaga() {
    yield takeLatest(AuthSagaActions.LOGOUT, logoutFlow);
}