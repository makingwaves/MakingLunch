import {Request} from "@app/state/common/types";

export enum MessageStatus {
    posted = 'POSTED',
    pending = 'PENDING',
    finished = 'FINISHED'
}

export interface Message {
    messageId: string;
    memberId: string;
    time: string;
    message: string;
    status: MessageStatus;
}

export interface MessageHashTable {
    [messageId: string]: Message;
}

export type ChatState = {
    request: Request,
    data: MessageHashTable
};

export enum ChatActions {
    SET_LOADED_CHAT_MESSAGES = 'CHAT/SET_LOADED_CHAT_MESSAGES',
    ADD_CHAT_MESSAGE = 'CHAT/ADD_CHAT_MESSAGE',
    UPDATE_CHAT_MESSAGE = 'CHAT/UPDATE_CHAT_MESSAGE',
    REMOVE_CHAT_MESSAGE = 'CHAT/REMOVE_CHAT_MESSAGE',
    SET_CHAT_MESSAGE_REQUEST_STATUS = 'CHAT/SET_CHAT_MESSAGE_REQUEST_STATUS'
}