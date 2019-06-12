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

function __showAppMessage(newMessage: NewAppMessage) {
    return makeAction(AppMessagesActions.SHOW_APP_MESSAGE, { ...newMessage, id: newMessage.id || uuid.v1() });
}

export const appMessagesActionsCreators = {
    showAppMessage: (newMessage: NewAppMessage) =>
        __showAppMessage(newMessage),

    showSuccessMessage: (newMessage: NewAppMessage) =>
        __showAppMessage({ ...newMessage, type: AppMessageType.Success }),

    showInformationMessage: (newMessage: NewAppMessage) =>
        __showAppMessage({ ...newMessage, type: AppMessageType.Information }),

    showWarningMessage: (newMessage: NewAppMessage) =>
        __showAppMessage({ ...newMessage, type: AppMessageType.Warning }),

    showErrorMessage: (newMessage: NewAppMessage) =>
        __showAppMessage({ ...newMessage, type: AppMessageType.Error }),

    hideAppMessage: (id: string) =>
        makeAction(AppMessagesActions.HIDE_APP_MESSAGE, id)
};