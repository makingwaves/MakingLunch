import { ChatResponseDto } from "../chatService/chatService";
import { Chat } from "../../state/lunches/types";
import { MapperFn } from "./utils";

export type ChatMessageMapFn<T> = MapperFn<ChatResponseDto, T>;

export const mapAndExtendChatMessages = (
    chatMessages: ChatResponseDto[],
    messageIdMapFn: ChatMessageMapFn<string>,
    memberIdMapFn: ChatMessageMapFn<string>,
    timeMapFn: ChatMessageMapFn<string>,
    messageContentMapFn: ChatMessageMapFn<string>
): Chat => {
    return chatMessages && chatMessages
        .map(message => ({
            messageId: messageIdMapFn(message),
            memberId: memberIdMapFn(message),
            time: timeMapFn(message),
            message: messageContentMapFn(message)
        }))
        .reduce((chatMessageMappedObject, message) => (
            chatMessageMappedObject[message.messageId] = message, chatMessageMappedObject
        ), {});
};

//mappers
export const mapMessageId = (message: ChatResponseDto): string => {
    return message && message.id;
}
export const mapMemberId = (message: ChatResponseDto): string => {
    return message && message.account.id;
}
export const mapTime = (message: ChatResponseDto): string => {
    return message && message.timeStamp;
}
export const mapMessageContent =  (message: ChatResponseDto): string => {
    return message && message.content;
}