import { takeEvery, fork } from 'redux-saga/effects';

import { AuthSagaTriggeringActions } from './actions';
import { loginFacebookSaga, loginGoogleSaga, logoutSaga, initializeAuthenticationSaga } from './workers';

export function* watchAuthSagas() {
    yield fork(initializeAuthenticationSaga);
    yield takeEvery(AuthSagaTriggeringActions.facebookLogin, loginFacebookSaga);
    yield takeEvery(AuthSagaTriggeringActions.googleLogin, loginGoogleSaga);
    yield takeEvery(AuthSagaTriggeringActions.LOGOUT, logoutSaga);
}
