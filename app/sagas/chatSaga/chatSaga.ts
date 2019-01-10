import { put, call, takeLatest } from "redux-saga/effects";

import { lunchesActionsCreators } from "../../state/lunches/actions";
import { Chat, AddChatMessagePayload, LunchSagaActions } from "../../state/lunches/types";
import { chatService } from "../../api";
import { hasKey } from "../utils/pureFn/pureFn";
import { PostChatMessageDto } from "../../api/chatService/chatService";


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

export function* postChatMessage({ payload }: { type: string, payload: PostChatMessageDto }) {
    try {
        const messagePayload: AddChatMessagePayload = yield call(
            [chatService, chatService.postChatMessage],
            payload
        );

        yield put(lunchesActionsCreators.addChatMessage(messagePayload));
    } catch(err) {
        yield put(lunchesActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when trying to post message.'));
    }
}

export function* chatSaga() {
    yield takeLatest(LunchSagaActions.GET_LUNCH_CHAT, getLunchChatFlow);
    yield takeLatest(LunchSagaActions.SEND_CHAT_MESSAGE, postChatMessage);
}