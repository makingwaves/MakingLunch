import {makeAction} from '../../utils/redux';
import {LunchActions, LunchStatus, TimeSpan, Location, AddLunchMemberPayload, Message} from './types';

export const lunchesActionsCreator = {
    createLunch: () => makeAction(LunchActions.CREATE_LUNCH),
    setLunchStatus: (status: LunchStatus) => makeAction(LunchActions.SET_LUNCH_STATUS, status),
    removeLunch: (lunchId: string) => makeAction(LunchActions.REMOVE_LUNCH, lunchId),
    addLunchMember: (payload: AddLunchMemberPayload) =>
        makeAction(LunchActions.ADD_LUNCH_MEMBER, payload),
    removeLunchMember: (memberId: string) => makeAction(LunchActions.REMOVE_LUNCH_MEMBER, memberId),
    setLunchLocation: (location: Location) => makeAction(LunchActions.SET_LUNCH_LOCATION, location),
    setLunchTime: (time: TimeSpan) => makeAction(LunchActions.SET_LUNCH_TIME, time),
    addChatMessage: (message: Message) => makeAction(LunchActions.ADD_CHAT_MESSAGE, message),
    startRequest: () => makeAction(LunchActions.START_REQUEST),
    requestSuccess: () => makeAction(LunchActions.REQUEST_SUCCESS),
    requestFail: (errorMsg: string) => makeAction(LunchActions.REQUEST_FAIL, errorMsg),
};
