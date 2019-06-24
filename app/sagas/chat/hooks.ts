import { takeEvery } from 'redux-saga/effects';

import { ChatSagaTriggeringActions } from './actions';
import { getChatMessagesSaga, sendChatMessageSaga} from './workers';

export function* watchChatSagas() {
    yield takeEvery(ChatSagaTriggeringActions.getChat, getChatMessagesSaga);
    yield takeEvery(ChatSagaTriggeringActions.sendChatMessage, sendChatMessageSaga);
}