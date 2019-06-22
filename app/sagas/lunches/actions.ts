import { makeAction } from '@app/utils/redux';

export const enum LunchesSagaTriggeringActions {
    getLunches = 'LUNCHES/SAGA/GET_LUNCHES',
    requestLunch = 'LUNCHES/SAGA/REQUEST_LUNCH',
    cancelLunch = 'LUNCHES/SAGA/CANCEL_LUNCH',
}

export const lunchesSagaTriggers = {
    getLunches: () => makeAction(LunchesSagaTriggeringActions.getLunches),
    requestLunch: () => makeAction(LunchesSagaTriggeringActions.requestLunch),
    cancelLunch: () => makeAction(LunchesSagaTriggeringActions.cancelLunch),
};
