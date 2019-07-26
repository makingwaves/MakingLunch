import { makeAction } from '@app/utils/redux';
import { AppMessagesActions, AppMessage, AppMessageType } from './types';
import uuid from 'react-native-uuid'

export interface NewAppMessage {
    id?: string,
    type?: AppMessageType;
    duration?: number;

    title: string;
    message: string;
};

export enum MessageDuration {
    INFINITE = null,
    SHORT = 2500,
    DEFAULT = 5000,
    LONG = 15000
};

function makeShowMessageAction(newMessage: NewAppMessage) {
    return makeAction(AppMessagesActions.SHOW_APP_MESSAGE, {
        id: newMessage.id || uuid.v1(),
        duration: MessageDuration.DEFAULT,
        ...newMessage
    } as AppMessage);
}

export const appMessagesActionsCreators = {
    showAppMessage: (newMessage: NewAppMessage) =>
        makeShowMessageAction(newMessage),

    showSuccessMessage: (newMessage: NewAppMessage) =>
        makeShowMessageAction({ ...newMessage, type: AppMessageType.Success }),

    showInformationMessage: (newMessage: NewAppMessage) =>
        makeShowMessageAction({ ...newMessage, type: AppMessageType.Information }),

    showWarningMessage: (newMessage: NewAppMessage) =>
        makeShowMessageAction({ ...newMessage, type: AppMessageType.Warning }),

    showErrorMessage: (newMessage: NewAppMessage) =>
        makeShowMessageAction({ ...newMessage, type: AppMessageType.Error }),

    hideAppMessage: (id: string) =>
        makeAction(AppMessagesActions.HIDE_APP_MESSAGE, id)
};