import { put, call, takeLatest, select, takeEvery } from "redux-saga/effects";
import UUIDGenerator from 'react-native-uuid-generator';
import dayjs from 'dayjs';

import { lunchesActionsCreators } from "../../state/lunches/actions";
import { Chat, AddChatMessagePayload, LunchSagaActions, MessageStatus, UpdateChatMessagePayload, RemoveChatMessagePayload } from "../../state/lunches/types";
import { chatService } from "../../api";
import { hasKey } from "../utils/pureFn/pureFn";
import { PostChatMessageDto } from "../../api/chatService/chatService";
import { AppState } from "../../state/state";

export function* generateUUID() {
    try {
        const uuid: string = yield call(
            [UUIDGenerator, UUIDGenerator.getRandomUUID]
        );
        return uuid;
    } catch(err) {
        return err;
    }
};

export const getPendingMessageData = (messagePayload: PostChatMessageDto, userId: string, uuid: string): AddChatMessagePayload => {
    return {
        lunchId: messagePayload.lunchId,
        message: {
            messageId: uuid,
            memberId: userId,
            time: dayjs().toString(),
            message: messagePayload.messageContent,
            status: MessageStatus.pending
        }
    };
};

export const getFinishedMessageData = (lunchId: string, uuid: string): UpdateChatMessagePayload => {
    return {
        lunchId: lunchId,
        message: {
            messageId: uuid,
            status: MessageStatus.finished
        }
    };
};  

export const getRemovedMessageData = (lunchId: string, uuid: string): RemoveChatMessagePayload => {
    return {
        lunchId: lunchId,
        message: {
            messageId: uuid
        }
    };
}

export const getUserId = (store: AppState) => store.auth.profile.id;

export function* getLunchChatFlow({ lunchId }: { type: string, lunchId: string }) {
    try {
        const chat: Chat = yield call(
            [chatService, chatService.getChatMessages],
            lunchId
        );

        yield put(lunchesActionsCreators.setLunchChat({ lunchId, chat }));
    } catch(err) {
        yield put(lunchesActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when trying to fetch chat messages.'));
    }
}

export function* postChatMessage({ payload }: { type: string, payload: PostChatMessageDto }) {
    const uuid: string = yield call(generateUUID);
    const userId: string = yield select(getUserId);

    try {
        yield put(lunchesActionsCreators.clearErrorMessage());

        const pendingMessage: AddChatMessagePayload = yield call(
            getPendingMessageData,
            payload, userId, uuid
        );

        yield put(lunchesActionsCreators.addChatMessage(pendingMessage));
        yield call(
            [chatService, chatService.postChatMessage],
            payload
        );

        const finishedMessage: UpdateChatMessagePayload = yield call(
            getFinishedMessageData,
            payload.lunchId, uuid
        );
        yield put(lunchesActionsCreators.updateChatMessage(finishedMessage));
    } catch(err) {
        const deletedMessage: RemoveChatMessagePayload = yield call(
            getRemovedMessageData,
            payload.lunchId, uuid
        );
        yield put(lunchesActionsCreators.removeChatMessage(deletedMessage));
        yield put(lunchesActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when trying to post message.'));
    }
}

export function* chatSaga() {
    yield takeLatest(LunchSagaActions.GET_LUNCH_CHAT, getLunchChatFlow);
    yield takeEvery(LunchSagaActions.SEND_CHAT_MESSAGE, postChatMessage);
}