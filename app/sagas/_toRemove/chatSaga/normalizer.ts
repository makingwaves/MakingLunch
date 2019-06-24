import { ChatResponseDto } from "@app/api/chatService/chatService";
import { Chat, MessageStatus, AddChatMessagePayload } from "@app/state/lunches/types";

export const normalizeChatMessages = (data: ChatResponseDto[]): Chat => {
    return data
        .map(d => ({
            messageId: d.id,
            memberId: d.account.id,
            time: d.timeStamp,
            message: d.content,
            status: MessageStatus.finished
        }))
        .reduce((chatObject, d) => (
            chatObject[d.messageId] = d, chatObject
        ), {});
};

export const normalizeAddedChatMessage = (data: ChatResponseDto, lunchId: string): AddChatMessagePayload => {
    return {
        lunchId,
        message: {
            messageId: data.id,
            memberId: data.account.id,
            time: data.timeStamp,
            message: data.content,
            status: MessageStatus.finished
        }
    };
}