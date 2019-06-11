import { Reducer } from 'redux';

import { ActionUnion } from '@app/utils/redux';
import { appMessagesActionsCreators } from "./actions"
import { AppMessagesActions, AppMessagesState, AppMessage, AppMessageType } from "./types"


const initialState: AppMessagesState = {
    app_messages: []
};

type AppAction = ActionUnion<typeof appMessagesActionsCreators>;

export const appMessagesReducer: Reducer<AppMessagesState> = (state: AppMessagesState = initialState, action: AppAction) => {
    switch (action.type) {
        case AppMessagesActions.SHOW_APP_MESSAGE:
            return {
                ...state,
                app_messages: [...state.app_messages.filter(m => m.id != action.payload.id), action.payload]
            };
        case AppMessagesActions.HIDE_APP_MESSAGE:
            return {
                ...state,
                app_messages: [...state.app_messages.filter(m => m.id != action.payload)]
            };
    }
    return state;
};