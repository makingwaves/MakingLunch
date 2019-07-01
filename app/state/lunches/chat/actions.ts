import {makeAction} from "@app/state/common/actionCreators";
import {ChatActions, Message, MessageHashTable} from "@app/state/lunches/chat/types";
import {Request} from "@app/state/common/types";

export const chatActionsCreators = {
    setChatMessageRequestStatus: (lunchId: string, requestStatus: Request) => makeAction(ChatActions.SET_CHAT_MESSAGE_REQUEST_STATUS, {lunchId, requestStatus}),
    setLoadedChatMessages: (lunchId: string, messages: MessageHashTable) => makeAction(ChatActions.SET_LOADED_CHAT_MESSAGES, {lunchId, messages}),
    addChatMessage: (lunchId: string, message: Message) => makeAction(ChatActions.ADD_CHAT_MESSAGE, {lunchId, message}),
    updateChatMessage: (lunchId: string, message: Message) => makeAction(ChatActions.UPDATE_CHAT_MESSAGE, {lunchId, message}),
    removeChatMessage: (lunchId: string, messageId: string) => makeAction(ChatActions.REMOVE_CHAT_MESSAGE, {lunchId, messageId}),
};