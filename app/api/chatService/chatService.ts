import httpClient from "../../config/axios";

import { ErrorHandleService } from "../../services";

import { Chat } from "../../state/lunches/types";
import { BasicProfile } from "../../state/auth/types";
import { ErrorResponse } from "../../services/errorHandleService/errorHandleService";
import { mapAndExtendChatMessages, mapMemberId, mapMessageContent, mapMessageId, mapTime } from "../helpers/processedChat";

export interface AccountChat extends BasicProfile {
    email: string;
}

export interface ChatResponseDto {
    id: string;
    content: string;
    timeStamp: string;
    account: AccountChat;
}

class ChatService extends ErrorHandleService {

    public getChatMessages(lunchId: string): Promise<Chat | ErrorResponse> {
        return httpClient.get<ChatResponseDto[]>('/api/Messages/' + lunchId + '/0/32')
            .then(res => this.mapChatMessageResponse(res.data))
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to fetch chat messages.'))
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