import { takeEvery } from 'redux-saga/effects';

import { LunchesSagaTriggeringActions } from './actions';
import { getLunchesSaga, requestLunchSaga, cancelLunchSaga} from './workers';

export function* watchLunchesSagas() {
    yield takeEvery(LunchesSagaTriggeringActions.getLunches, getLunchesSaga);
    yield takeEvery(LunchesSagaTriggeringActions.requestLunch, requestLunchSaga);
    yield takeEvery(LunchesSagaTriggeringActions.cancelLunch, cancelLunchSaga);
}