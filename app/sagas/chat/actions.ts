import { makeAction } from '@app/utils/redux';

export enum ChatSagaTriggeringActions {
    getChat = 'CHAT/SAGA/GEP_CHAT',
    sendChatMessage = 'CHAT/SAGA/SEND_CHAT_MESSAGE',
}

export const chatSagaTriggers = {
    getChat: (lunchId: string, currentPage: number) => makeAction(
        ChatSagaTriggeringActions.getChat, {lunchId, currentPage}),

    sendChatMessage: (lunchId: string, content: string) => makeAction(
        ChatSagaTriggeringActions.sendChatMessage, {lunchId, content}),
};
