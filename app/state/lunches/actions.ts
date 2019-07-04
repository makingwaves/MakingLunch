import { makeAction } from '@app/utils/redux';
import {Lunch, LunchesMap, LunchesActions, Location, TimeSpan} from './types';
import {Request} from "@app/state/common/types";

export const lunchesActionsCreators = {
    setLunchesRequestStatus: (requestStatus: Request) => makeAction(LunchesActions.SET_LUNCHES_REQUEST_STATUS, requestStatus),
    setLunches: (lunches: LunchesMap) => makeAction(LunchesActions.SET_LUNCHES, lunches),
    createLunch: (lunch: Lunch) => makeAction(LunchesActions.CREATE_LUNCH, lunch),
    removeLunch: (lunchId: string) => makeAction(LunchesActions.REMOVE_LUNCH, lunchId),

    addLunchMember: (
        lunchId: string,
        lunchMember: {
            memberId: string,
            timeSpan: TimeSpan,
            location: Location
        }) => makeAction(LunchesActions.ADD_LUNCH_MEMBER, { lunchId, lunchMember }),

    removeLunchMember: (
        lunchId: string,
        memberId: string
    ) => makeAction(LunchesActions.REMOVE_LUNCH_MEMBER, { lunchId, memberId }),
};
