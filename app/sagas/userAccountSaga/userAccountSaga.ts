
import { takeLatest, put, call, select } from 'redux-saga/effects';
import RNSecureKeyStore from "react-native-secure-key-store";

import { AuthSagaActions, Profile } from '../../state/auth/types';
import { authActionsCreators } from '../../state/auth/actions';
import { accountService } from './../../api';

import { TOKEN_KEY, configureGoogle } from '../loginSaga/loginSaga';
import { AppState } from '../../state/state';
import { Platform } from 'react-native';

export function* getSecureStoredKey(key: string) {
    try {
        const token: string = yield call(
            [RNSecureKeyStore, RNSecureKeyStore.get],
            key
        );
        return token;
    } catch(err) {
        return err;
    }
}

export const getUserProfileFromStore = (store: AppState) => store.auth.profile;

export function* getUserDataFlow() {
    try {
        const userProfile: Profile = yield select(getUserProfileFromStore);

        if(userProfile)
            return;

        yield put(authActionsCreators.startRequest());

        const userData: Profile = yield call(
            [accountService, accountService.getUserData]
        );

        yield put(authActionsCreators.setProfile(userData));
        yield put(authActionsCreators.requestSuccess());
    } catch(err) {
        yield put(authActionsCreators.requestFail('Error when trying to fetch user data.'));
    }
}

export function* updateUserDataFlow({ userData }: { type: string, userData: Profile }) {
    try {
        yield put(authActionsCreators.startRequest());

        const updatedUserData: Profile = yield call(
            [accountService, accountService.updateUserData],
            userData.name, userData.description
        );

        yield put(authActionsCreators.setProfile(updatedUserData));
        yield put(authActionsCreators.requestSuccess());
    } catch(err) {
        yield put(authActionsCreators.requestFail('Error when trying to update user data.'));
    }
}

export function* getUserDataWithTokenFlow() {
    try {
        const token: string = yield call(getSecureStoredKey, TOKEN_KEY);

        yield call(
            configureGoogle[Platform.OS]
        );

        if(typeof token === 'string') {
            const userData: Profile = yield call(
                [accountService, accountService.getUserDataWithToken],
                token
            );
            
            yield put(authActionsCreators.setToken(token));
            yield put(authActionsCreators.setProfile(userData));
        }
        else {
            yield put(authActionsCreators.setProfile(null));
        }
    } catch(err) {
        yield put(authActionsCreators.setProfile(null));
    }
}

export function* userAccountSaga() {
    yield takeLatest(AuthSagaActions.GET_USER_DATA, getUserDataFlow);
    yield takeLatest(AuthSagaActions.UPDATE_USER_DATA, updateUserDataFlow);
    yield takeLatest(AuthSagaActions.GET_USER_DATA_WITH_TOKEN, getUserDataWithTokenFlow);
}