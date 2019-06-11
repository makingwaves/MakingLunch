import { makeAction } from '@app/utils/redux';
import { AppMessagesActions, AppMessage, AppMessageType } from './types';
import { uuid } from "react-native-uuid"


export const appMessagesActionsCreators = {

    showAppMessage: (message: AppMessage) =>
        makeAction(AppMessagesActions.SHOW_APP_MESSAGE, message),

    showInformationMessage: (title: string, message: string, id?: string, duration?: number) =>
        makeAction(AppMessagesActions.SHOW_APP_MESSAGE, {
            id: id || uuid(),
            type: AppMessageType.Information,
            title: title,
            message: message,
            duration: duration
        }),

    showWarningMessage: (title: string, message: string, id: string | null = null, duration: number | null = null) =>
        makeAction(AppMessagesActions.SHOW_APP_MESSAGE, {
            id: id || uuid(),
            type: AppMessageType.Warning,
            title: title,
            message: message,
            duration: duration
        }),

    showErrorMessage: (title: string, message: string, id?: string, duration?: number) =>
        makeAction(AppMessagesActions.SHOW_APP_MESSAGE, {
            id: id || uuid(),
            type: AppMessageType.Error,
            title: title,
            message: message,
            duration: duration
        }),

    hideAppMessage: (id: string) =>
        makeAction(AppMessagesActions.HIDE_APP_MESSAGE, id)
};