import { MapperFn } from "./utils";
import { ChatResponseDto } from "api/chatService/chatService";
import { Chat, AddChatMessagePayload } from "state/lunches/types";


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

export const mapMessageToPayload = (
    chatMessage: ChatResponseDto,
    lunchId: string,
    messageIdMapFn: ChatMessageMapFn<string>,
    memberIdMapFn: ChatMessageMapFn<string>,
    timeMapFn: ChatMessageMapFn<string>,
    messageContentMapFn: ChatMessageMapFn<string>
): AddChatMessagePayload => {
    return chatMessage && {
        lunchId: lunchId,
        message: {
            messageId: messageIdMapFn(chatMessage),
            memberId: memberIdMapFn(chatMessage),
            time: timeMapFn(chatMessage),
            message: messageContentMapFn(chatMessage)
        }
    };
}

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