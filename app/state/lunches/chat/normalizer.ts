import { ChatMessageDto } from "@app/api/chatService/chatService";
import { MessageStatus, Message, MessageHashTable } from "@app/state/lunches/chat/types";

export const normalizeMessage = (data: ChatMessageDto): Message => {
    return {
        messageId: data.id,
        memberId: data.account.id,
        time: data.timeStamp,
        message: data.content,
        status: MessageStatus.finished
    };
}

export const normalizeChatMessages = (data: ChatMessageDto[]): MessageHashTable => {
    return data
        .map(normalizeMessage)
        .reduce((previous, current) => (previous[current.messageId] = current), {});
};

