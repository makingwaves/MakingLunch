import { makeAction } from '@app/utils/redux';

export enum ChatSagaTriggeringActions {
    getChat = 'PROFILE/SAGA/GEP_PROFILE',
    sendChatMessage = 'PROFILE/SAGA/UPDATE_PROFILE',
}

export const chatSagaTriggers = {
    getChat: (lunchId: string, currentPage: number) => makeAction(
        ChatSagaTriggeringActions.getChat, {lunchId, currentPage}),

    sendChatMessage: (lunchId: string, content: string) => makeAction(
        ChatSagaTriggeringActions.sendChatMessage, {lunchId, content}),
};