import { takeEvery, call } from 'redux-saga/effects';

import { ChatSagaTriggeringActions } from './actions';
import { getChatMessagesSaga, sendChatMessageSaga, newMessageNotification } from './workers';

export function* watchChatSagas() {
    yield takeEvery(ChatSagaTriggeringActions.getChat, getChatMessagesSaga);
    yield takeEvery(ChatSagaTriggeringActions.sendChatMessage, sendChatMessageSaga);
    // yield call(newMessageNotification);
}