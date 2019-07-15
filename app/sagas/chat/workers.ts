import dayjs from 'dayjs';
import UUIDGenerator from 'react-native-uuid-generator';
import {call, put, select} from "redux-saga/effects";
import chatService, {ChatMessageDto} from "@app/api/chatService/chatService";
import {chatSagaTriggers} from "@app/sagas/chat/actions";
import {Profile} from "@app/state/profile/types";
import {requestAction} from "@app/sagas/common/requests";
import {chatActionsCreators} from "@app/state/chat/actions";
import {normalizeChatMessages} from "@app/state/chat/normalizer";
import {ProfileSelector} from "@app/state/profile/selectors";
import {Message, MessageStatus} from "@app/state/chat/types";

export function* getChatMessagesSaga({ payload } : ReturnType<typeof chatSagaTriggers.getChat>) {
    try {
        const chatMessages = yield call(
            requestAction,
            chatActionsCreators.setChatMessageRequestStatus,
            call([chatService, chatService.getChatMessages], payload.lunchId, payload.currentPage)
        );

        yield put(chatActionsCreators.setLoadedChatMessages(payload.lunchId, normalizeChatMessages(chatMessages)));
    } catch (err) {
       console.info('Error when trying to fetch chat messages.');
    }
}

export function* sendChatMessageSaga({ payload }:  ReturnType<typeof chatSagaTriggers.sendChatMessage>) {
    try {
        const uuid: string = yield call([UUIDGenerator, UUIDGenerator.getRandomUUID]);
        const profile: Profile = yield select(ProfileSelector.profile);
        const messageToAdd: Message = {
            messageId: uuid,
            memberId: profile.id,
            time: dayjs().format(),
            message: payload.content,
            status: MessageStatus.pending
        };

        yield put(chatActionsCreators.addChatMessage(payload.lunchId, messageToAdd));
        const chatMessageDto: ChatMessageDto = yield call(
            [chatService, chatService.sendChatMessage], payload.lunchId, payload.content
        );

        messageToAdd.messageId = chatMessageDto.id;
        messageToAdd.status = MessageStatus.finished;

        yield put(chatActionsCreators.removeChatMessage(payload.lunchId, uuid));
        yield put(chatActionsCreators.addChatMessage(payload.lunchId, messageToAdd));
    } catch (err) {
        console.info('Error when trying to post message.');
    }
}
