import { makeAction } from '@app/utils/redux';
import {Location, TimeSpan} from "@app/state/lunches/types";

export enum LunchesSagaTriggeringActions {
    getLunches = 'LUNCHES/SAGA/GET_LUNCHES',
    requestLunch = 'LUNCHES/SAGA/REQUEST_LUNCH',
    cancelLunch = 'LUNCHES/SAGA/CANCEL_LUNCH',
}

export const lunchesSagaTriggers = {
    getLunches: () => makeAction(LunchesSagaTriggeringActions.getLunches),
    requestLunch: (timeSpan: TimeSpan, location: Location) => makeAction(
        LunchesSagaTriggeringActions.requestLunch,
        {timeSpan, location}),
    cancelLunch: (lunchId: string) => makeAction(LunchesSagaTriggeringActions.cancelLunch, lunchId),
};
