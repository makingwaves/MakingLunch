import { takeLatest, put } from 'redux-saga/effects';

import { AppMessagesActions, AppMessage } from "../../state/app_messages/types"
import { appMessagesActionsCreators } from "../../state/app_messages/actions"

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* addAppMessage({ message }: { type: string, message: AppMessage }) {
    if (message.duration !== null) {
        yield delay(message.duration);
        yield put(appMessagesActionsCreators.hideAppMessage(message.id));
    }
}

export function* appMessagesSaga() {
    yield takeLatest(AppMessagesActions.SHOW_APP_MESSAGE, addAppMessage);
}