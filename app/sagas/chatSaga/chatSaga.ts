import dayjs from 'dayjs';
import UUIDGenerator from 'react-native-uuid-generator';
import { put, call, takeLatest, select, takeEvery } from "redux-saga/effects";

import { AppState } from "@app/state/state";
import { lunchesActionsCreators } from "@app/state/lunches/actions";
import chatService, { PostChatMessageDto } from "@app/api/chatService/chatService";
import { AddChatMessagePayload, MessageStatus, UpdateChatMessagePayload, RemoveChatMessagePayload, LunchSagaActions, Chat } from "@app/state/lunches/types";

export interface GetLunchChatData {
    lunchId: string;
    lazyLoaded: boolean;
    currentPage: number;
};

export function* generateUUID() {
    try {
        const uuid: string = yield call(
            [UUIDGenerator, UUIDGenerator.getRandomUUID]
        );
        return uuid;
    } catch (err) {
        return err;
    }
};

export const getPendingMessageData = (messagePayload: PostChatMessageDto, userId: string, uuid: string): AddChatMessagePayload => {
    return {
        lunchId: messagePayload.lunchId,
        message: {
            messageId: uuid,
            memberId: userId,
            time: dayjs().format(),
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
};

export const getUserId = (store: AppState) => store.auth.profile.id;

export function* getLunchChatFlow({ payload }: { type: string, payload: GetLunchChatData }) {
    try {
        yield put(lunchesActionsCreators.startRequest());
        const chat: Chat = yield call(
            [chatService, chatService.getChatMessages],
            payload.lunchId, payload.currentPage
        );

        yield put(lunchesActionsCreators.requestSuccess());

        if (payload.lazyLoaded)
            yield put(lunchesActionsCreators.addLoadedChatMessages({ lunchId: payload.lunchId, chat: chat }));
        else
            yield put(lunchesActionsCreators.setLunchChat({ lunchId: payload.lunchId, chat: chat }));
    } catch (err) {
        yield put(lunchesActionsCreators.requestFail('Error when trying to fetch chat messages.'));
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
    } catch (err) {
        const deletedMessage: RemoveChatMessagePayload = yield call(
            getRemovedMessageData,
            payload.lunchId, uuid
        );
        yield put(lunchesActionsCreators.removeChatMessage(deletedMessage));
        yield put(lunchesActionsCreators.requestFail('Error when trying to post message.'));
    }
}

export function* chatSaga() {
    yield takeLatest(LunchSagaActions.GET_LUNCH_CHAT, getLunchChatFlow);
    yield takeEvery(LunchSagaActions.SEND_CHAT_MESSAGE, postChatMessage);
}