import { delay } from 'redux-saga';
import { Platform } from 'react-native';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { takeLatest, put, call, select } from 'redux-saga/effects';

import { AppState } from '@app/state/state';
import { accountService } from '@app/api';
import { authActionsCreators } from '@app/state/auth/actions';
import { Profile, AuthSagaActions } from '@app/state/auth/types';
import { TOKEN_KEY, configureGoogle } from '@app/sagas/loginSaga/loginSaga';

export function* getSecureStoredKey(key: string) {
    try {
        const token: string = yield call(
            [RNSecureKeyStore, RNSecureKeyStore.get],
            key
        );
        return token;
    } catch (err) {
        return err;
    }
}

export const getUserProfileFromStore = (store: AppState) => store.auth.profile;

export function* getUserDataFlow() {
    try {
        const userProfile: Profile = yield select(getUserProfileFromStore);

        if (userProfile)
            return;

        yield put(authActionsCreators.startRequest());

        const userData: Profile = yield call(
            [accountService, accountService.getUserData]
        );

        yield put(authActionsCreators.setProfile(userData));
        yield put(authActionsCreators.requestSuccess());
    } catch (err) {
        yield put(authActionsCreators.requestFail('Error when trying to fetch user data.'));
    }
}

export function* updateUserDataFlow({ userData }: { type: string, userData: { name: string, description: string } }) {
    try {
        yield put(authActionsCreators.startRequest());

        const updatedUserData: Profile = yield call(
            [accountService, accountService.updateUserData],
            userData.name, userData.description
        );

        yield put(authActionsCreators.setProfile(updatedUserData));
        yield put(authActionsCreators.requestSuccess());
    } catch (err) {
        yield put(authActionsCreators.requestFail('Error when trying to update user data.'));
    }
}

export function* getUserToken() {
    try {

        yield call(
            configureGoogle[Platform.OS]
        );

        const token: string = yield call(getSecureStoredKey, TOKEN_KEY);

        yield delay(1000);

        yield put(authActionsCreators.setToken(typeof token === 'string' ? token : null));
    } catch (err) {
        yield put(authActionsCreators.setToken(null));
    }
}

export function* userAccountSaga() {
    yield takeLatest(AuthSagaActions.GET_USER_DATA, getUserDataFlow);
    yield takeLatest(AuthSagaActions.UPDATE_USER_DATA, updateUserDataFlow);
    yield takeLatest(AuthSagaActions.GET_USER_TOKEN, getUserToken);
}