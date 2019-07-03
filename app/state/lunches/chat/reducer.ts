import { createReducer, GenericReducer } from "@app/state/common/reducers";
import {ActionUnion, RequestState} from "@app/state/common/types";

import { ChatState, ChatActions } from "./types";
import { chatActionsCreators } from "./actions";

export type ChatActionUnion = ActionUnion<typeof chatActionsCreators>;

const initialState: ChatState = {
    request: {
        state: RequestState.none,
        errorMsg: '',
    },
    data: {},
};

class ChatReducer extends GenericReducer<ChatState, ChatActionUnion, ChatActions> {

    constructor(chatState: ChatState) {
        super(chatState);

        this.reducerMap.set(ChatActions.SET_LOADED_CHAT_MESSAGES, this.setLoadedChatMessages);
        this.reducerMap.set(ChatActions.ADD_CHAT_MESSAGE, this.addChatMessage);
        this.reducerMap.set(ChatActions.UPDATE_CHAT_MESSAGE, this.updateChatMessage);
        this.reducerMap.set(ChatActions.REMOVE_CHAT_MESSAGE, this.removeChatMessage);


    }

    private setLoadedChatMessages = (
        state: ChatState,
        action: ReturnType<typeof chatActionsCreators.setLoadedChatMessages>
    ) : ChatState => {
        return {
            ...state,
            data: {
                ...state.data,
                ...action.payload.messages
            }

        };
    };

    private addChatMessage = (
        state: ChatState,
        action: ReturnType<typeof chatActionsCreators.addChatMessage>
    ) : ChatState => {

        return {
            ...state,
            data: {
                ...state.data,
                [action.payload.message.messageId]: action.payload.message
            }

        }
    };

    private updateChatMessage = (
        state: ChatState,
        action: ReturnType<typeof chatActionsCreators.updateChatMessage>
    ) : ChatState => {
        return {
            ...state,
            data: {
                ...state.data,
                [action.payload.message.messageId]: action.payload.message
            }
        }
    };

    private removeChatMessage = (
        state: ChatState,
        action: ReturnType<typeof chatActionsCreators.removeChatMessage>
    ) : ChatState => {
        const {[action.payload.messageId]: value, ...dataWithoutItem } = state.data;

        return {
            ...state,
            data: dataWithoutItem
        };
    }
}

export const chatReducer = createReducer(new ChatReducer(initialState));

