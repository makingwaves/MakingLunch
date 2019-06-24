import api from "@app/config/axios";

import { ErrorResponse } from "@app/services/errorHandleService/errorHandleService";
import { ErrorHandleService } from "@app/services";

export interface ChatMessageDto {
    id: string;
    content: string;
    timeStamp: string;
    account: {
        id: string;
        name: string;
        photo: string;
        description: string;
        email: string;
        meetingsNumber: number;
    };
}

class ChatService extends ErrorHandleService {

    public getChatMessages(lunchId: string, currentPage: number): Promise<ChatMessageDto[] | ErrorResponse> {
        return api.get('/api/Messages/' + lunchId + '/' + currentPage + '/16')
            .then(response => response.data)
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to fetch chat messages.'))
    }

    public sendChatMessage(lunchId: string, content: string): Promise<ChatMessageDto | ErrorResponse> {
        return api.post('/api/Messages', {
            lunchId: lunchId,
            content: content
        })
            .then(response => response.data)
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to fetch chat messages.'))
    }
}

const chatService = new ChatService;

export default chatService;