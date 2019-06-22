import { takeEvery } from 'redux-saga/effects';

import { ProfileSagaTriggeringActions } from './actions';
import { getProfileSaga, updateProfileSaga } from './workers';

export function* watchProfileSagas() {
    yield takeEvery(ProfileSagaTriggeringActions.getProfile, getProfileSaga);
    yield takeEvery(ProfileSagaTriggeringActions.updateProfile, updateProfileSaga);
}