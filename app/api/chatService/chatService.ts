import httpClient from "@app/config/axios";

import { BasicProfile } from "@app/state/auth/types";
import { ErrorResponse } from "@app/services/errorHandleService/errorHandleService";
import { ErrorHandleService } from "@app/services";
import { Chat, AddChatMessagePayload } from "@app/state/lunches/types";
import { normalizeChatMessages, normalizeAddedChatMessage } from "@app/sagas/chatSaga/normalizer";

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

    public getChatMessages(lunchId: string, currentPage: number): Promise<Chat | ErrorResponse> {
        return httpClient.get<ChatResponseDto[]>('/api/Messages/' + lunchId + '/' + currentPage + '/16')
            .then(res => normalizeChatMessages(res.data))
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to fetch chat messages.'))
    }

    public postChatMessage(data: PostChatMessageDto): Promise<AddChatMessagePayload | ErrorResponse> {
        return httpClient.post<ChatResponseDto>('/api/Messages', {
            lunchId: data.lunchId,
            content: data.messageContent
        })
            .then(res => normalizeAddedChatMessage(res.data, data.lunchId))
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to fetch chat messages.'))
    }
}

const chatService = new ChatService;

export default chatService;