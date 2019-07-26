import { makeAction } from '@app/utils/redux';

import {
    Lunch,
    LunchActions,
    LunchesMap,
    AddLunchMemberPayload,
    SetLunchLocationPayload,
    SetLunchTimePayload,
    UpdateLunchPayload,
    CreateLunchPayload,
    SetLunchCancellation,
    SetLunchStatusPayload,
    SetLunchChatPayload,
    RemoveLunchMemberPayload,
    AddChatMessagePayload,
    UpdateChatMessagePayload,
    RemoveChatMessagePayload,
} from './types';

export const lunchesActionsCreators = {
    setLunches: (lunchesPayload: LunchesMap) => makeAction(LunchActions.SET_LUNCHES, lunchesPayload),
    createLunch: (lunchPayload: CreateLunchPayload) => makeAction(LunchActions.CREATE_LUNCH, lunchPayload),
    setLunchStatus: (statusPayload: SetLunchStatusPayload) => makeAction(LunchActions.SET_LUNCH_STATUS, statusPayload),
    setLunchCancellation: (lunchPayload: SetLunchCancellation) => makeAction(LunchActions.SET_LUNCH_CANCELLATION, lunchPayload),
    updateLunch: (lunchPayload: UpdateLunchPayload) => makeAction(LunchActions.UPDATE_LUNCH, lunchPayload),
    removeLunch: (lunchId: string) => makeAction(LunchActions.REMOVE_LUNCH, lunchId),
    addLunch: (lunchPayload: Lunch) => makeAction(LunchActions.ADD_LUNCH, lunchPayload),
    addLunchMember: (payload: AddLunchMemberPayload) =>
        makeAction(LunchActions.ADD_LUNCH_MEMBER, payload),
    removeLunchMember: (payload: RemoveLunchMemberPayload) => makeAction(LunchActions.REMOVE_LUNCH_MEMBER, payload),
    setLunchLocation: (locationPayload: SetLunchLocationPayload) =>
        makeAction(LunchActions.SET_LUNCH_LOCATION, locationPayload),
    setLunchTime: (timePayload: SetLunchTimePayload) => makeAction(LunchActions.SET_LUNCH_TIME, timePayload),
    setLunchChat: (chatPayload: SetLunchChatPayload) => makeAction(LunchActions.SET_LUNCH_CHAT, chatPayload),
    addLoadedChatMessages: (chatPayload: SetLunchChatPayload) => makeAction(LunchActions.ADD_LOADED_CHAT_MESSAGES, chatPayload),
    addChatMessage: (messagePayload: AddChatMessagePayload) =>
        makeAction(LunchActions.ADD_CHAT_MESSAGE, messagePayload),
    updateChatMessage: (messagePayload: UpdateChatMessagePayload) => makeAction(LunchActions.UPDATE_CHAT_MESSAGE, messagePayload),
    removeChatMessage: (messagePayload: RemoveChatMessagePayload) => makeAction(LunchActions.REMOVE_CHAT_MESSAGE, messagePayload),
    startRequest: () => makeAction(LunchActions.START_REQUEST),
    requestSuccess: () => makeAction(LunchActions.REQUEST_SUCCESS),
    requestFail: () => makeAction(LunchActions.REQUEST_FAIL),
    clearErrorMessage: () => makeAction(LunchActions.CLEAR_ERROR_MESSAGE)
};
