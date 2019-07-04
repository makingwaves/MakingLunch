import {createReducer, GenericReducer} from "@app/state/common/reducers";
import {ActionUnion} from "@app/state/common/types";
import {ChatActions, ChatState} from "./types";
import {chatActionsCreators} from "./actions";

export type ChatActionUnion = ActionUnion<typeof chatActionsCreators>;

const initialState: ChatState = {};

class ChatReducer extends GenericReducer<ChatState, ChatActionUnion, ChatActions> {

    constructor(chatState: ChatState) {
        super(chatState);

        this.reducerMap.set(ChatActions.SET_LOADED_CHAT_MESSAGES, this.setLoadedChatMessages);
        this.reducerMap.set(ChatActions.ADD_CHAT_MESSAGE, this.addChatMessage);
        this.reducerMap.set(ChatActions.UPDATE_CHAT_MESSAGE, this.updateChatMessage);
        this.reducerMap.set(ChatActions.REMOVE_CHAT_MESSAGE, this.removeChatMessage);
        this.reducerMap.set(ChatActions.SET_CHAT_MESSAGE_REQUEST_STATUS, this.setChatMessageRequestStatus);
    }

    private setChatMessageRequestStatus = (
        state: ChatState,
        action: ReturnType<typeof chatActionsCreators.setChatMessageRequestStatus>
    ): ChatState => {
        const {lunchId, requestStatus} = action.payload;

        return {
            ...state,
            [lunchId]: {
                ...state[lunchId],
                request: {
                    state: requestStatus.state,
                    errorMsg: requestStatus.errorMsg
                }
            }
        }
    };

    private setLoadedChatMessages = (
        state: ChatState,
        action: ReturnType<typeof chatActionsCreators.setLoadedChatMessages>
    ) : ChatState => {
        const { lunchId, messages } = action.payload;
        return {
            ...state,
            [lunchId] : {
                ...state[lunchId],
                data: messages
            }
        };
    };

    private addChatMessage = (
        state: ChatState,
        action: ReturnType<typeof chatActionsCreators.addChatMessage>
    ) : ChatState => {
        const { lunchId, message } = action.payload;
        return {
            ...state,
            [lunchId]: {
                ...state[lunchId],
                data: {
                    ...state[lunchId].data,
                    [message.messageId]: message
                }
            }
        }
    };

    private updateChatMessage = (
        state: ChatState,
        action: ReturnType<typeof chatActionsCreators.updateChatMessage>
    ) : ChatState => {
        const {lunchId, message} = action.payload;
        return {
            ...state,
            [lunchId]: {
                ...state[lunchId],
                data: {
                    ...state[lunchId].data,
                    [message.messageId]: message
                }
            }
        }
    };

    private removeChatMessage = (
        state: ChatState,
        action: ReturnType<typeof chatActionsCreators.removeChatMessage>
    ) : ChatState => {
        const {lunchId, messageId} = action.payload
        const {[messageId]: value, ...dataWithoutItem } = state[lunchId].data;

        return {
            ...state,
            [lunchId]: {
                ...state[lunchId],
                data: dataWithoutItem
            }
        };
    }
}

export const chatReducer = createReducer(new ChatReducer(initialState));

