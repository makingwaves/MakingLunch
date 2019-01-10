import httpClient from "../../config/axios";

import { BasicProfile } from "../../state/auth/types";
import { ErrorHandleService } from "../../services";
import { Chat, AddChatMessagePayload } from "../../state/lunches/types";
import { ErrorResponse } from "../../services/errorHandleService/errorHandleService";
import { mapMessageToPayload, mapMessageId, mapMemberId, mapTime, mapMessageContent, mapAndExtendChatMessages } from "../helpers/processedChat";


export interface PostChatMessageDto {
    lunchId: string;
    messageContent: string;
};

export interface AccountChat extends BasicProfile {
    email: string;
};

export interface ChatResponseDto {
    id: string;
    content: string;
    timeStamp: string;
    account: AccountChat;
};
  
class ChatService extends ErrorHandleService {

    public getChatMessages(lunchId: string): Promise<Chat | ErrorResponse> {
        return httpClient.get<ChatResponseDto[]>('/api/Messages/' + lunchId + '/0/32')
            .then(res => this.mapChatMessageResponse(res.data))
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to fetch chat messages.'))
    }

    public postChatMessage(data: PostChatMessageDto): Promise<AddChatMessagePayload | ErrorResponse> {
        return httpClient.post<ChatResponseDto>('/api/Messages', {
            lunchId: data.lunchId,
            content: data.messageContent
        })
            .then(res => this.mapAddedMessage(res.data, data.lunchId))
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to fetch chat messages.'))
    }

    private mapAddedMessage(messageResponse: ChatResponseDto, lunchId: string): AddChatMessagePayload {
        return mapMessageToPayload(messageResponse, lunchId, 
            message => mapMessageId(message),
            message => mapMemberId(message),
            message => mapTime(message),
            message => mapMessageContent(message)
        );
    }

    private mapChatMessageResponse(chatResponse: ChatResponseDto[]): Chat {
        return mapAndExtendChatMessages(chatResponse,
            message => mapMessageId(message),
            message => mapMemberId(message),
            message => mapTime(message),
            message => mapMessageContent(message)
        );
    }
}

const chatService = new ChatService;

export default chatService;