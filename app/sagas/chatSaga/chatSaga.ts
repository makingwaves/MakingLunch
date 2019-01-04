import { put, call, takeLatest } from "redux-saga/effects";

import { lunchesActionsCreators } from "../../state/lunches/actions";
import { hasKey } from "../utils/pureFn/pureFn";
import { chatService } from "../../api";
import { LunchSagaActions, Chat } from "../../state/lunches/types";


export function* getLunchChatFlow({ lunchId }: { type: string, lunchId: string }) {
    try {
        yield put(lunchesActionsCreators.startRequest());

        const chat: Chat = yield call(
            [chatService, chatService.getChatMessages],
            lunchId
        );

        yield put(lunchesActionsCreators.setLunchChat({ lunchId, chat }));
        yield put(lunchesActionsCreators.requestSuccess());
    } catch(err) {
        yield put(lunchesActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when trying to fetch chat messages.'));
    }
}

export function* chatSaga() {
    yield takeLatest(LunchSagaActions.GET_LUNCH_CHAT, getLunchChatFlow);
}