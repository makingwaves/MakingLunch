import { takeLatest, takeEvery, put } from 'redux-saga/effects';

import { AppMessagesActions, AppMessage, AppMessageType } from "../../state/app_messages/types"
import { appMessagesActionsCreators } from "../../state/app_messages/actions"

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export function* addAppMessage({ payload }: { type: string, payload: AppMessage }) {
    if (payload.duration !== null) {
        yield delay(payload.duration);
        yield put(appMessagesActionsCreators.hideAppMessage(payload.id));
    }
}

export function* appMessagesSaga() {
    yield takeEvery(AppMessagesActions.SHOW_APP_MESSAGE, addAppMessage);
}