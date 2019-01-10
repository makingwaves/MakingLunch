
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import RNSecureKeyStore from "react-native-secure-key-store";

import { AuthSagaActions } from '../../state/auth/types';
import { authActionsCreators } from '../../state/auth/actions';
import { navigationService } from '../../services';

import { hasKey } from '../utils/pureFn/pureFn';
import { TOKEN_KEY } from './../loginSaga/loginSaga';

export function* removeSecureStoredKey(key: string) {
    try {
        yield call(
            [RNSecureKeyStore, RNSecureKeyStore.remove],
            key
        );
    } catch(err) {
        return err;
    }
}

export function* logoutFlow() {
    try {
        const { loggedInFb, loggedInGoogle } = yield all({
            loggedInFb: call([AccessToken, AccessToken.getCurrentAccessToken]),
            loggedInGoogle: call([GoogleSignin, GoogleSignin.isSignedIn])
        });

        yield call(removeSecureStoredKey, TOKEN_KEY);

        if(loggedInFb)
            yield call(
                [LoginManager, LoginManager.logOut]
            );
        if(loggedInGoogle)
            yield call(
                [GoogleSignin, GoogleSignin.signOut]
            );
        
        yield put(authActionsCreators.setProfile(null));
        yield put(authActionsCreators.setToken(null));

        yield navigationService.navigate('Auth');
    } catch(err) {
        yield put(authActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when trying to logout.'));
    }
}

export function* logoutSaga() {
    yield takeLatest(AuthSagaActions.LOGOUT, logoutFlow);
}