
import { takeLatest, put, call } from 'redux-saga/effects';

import { AuthActions, Profile } from '../../state/auth/types';
import { authActionsCreators } from '../../state/auth/actions';
import { accountService } from './../../api';

import { hasKey } from '../utils/pureFn/pureFn';

export function* getUserDataFlow() {
    try {
        yield put(authActionsCreators.startRequest());

        const userData: Profile = yield call(
            [accountService, accountService.getUserData]
        );

        yield put(authActionsCreators.setProfile(userData));
        yield put(authActionsCreators.requestSuccess());
    } catch(err) {
        yield put(authActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when trying to fetch user data.'));
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
        yield put(authActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when trying to update user data.'));
    }
}

export function* userAccountSaga() {
    yield takeLatest(AuthActions.GET_USER_DATA, getUserDataFlow);
    yield takeLatest(AuthActions.UPDATE_USER_DATA, updateUserDataFlow);
}