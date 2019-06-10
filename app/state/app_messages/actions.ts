import { makeAction } from '@app/utils/redux';
import { AppMessagesActions, AppMessage } from './types';

export const appMessagesActionsCreators = {

    showAppMessage: (message: AppMessage) =>
        makeAction(AppMessagesActions.SHOW_APP_MESSAGE, message),

    hideAppMessage: (id: string) =>
        makeAction(AppMessagesActions.HIDE_APP_MESSAGE, id)
};