import { put, call } from 'redux-saga/effects';
import { lunchesActionsCreators } from '@app/state/lunches/actions';
import { membersActionsCreators } from '@app/state/members/actions';
import lunchesService from '@app/api/lunchesService/lunchesService';
import { lunchesSagaTriggers } from "@app/sagas/lunches/actions";
import { requestAction } from "@app/sagas/common/requests";

export function* getLunchesSaga() {
    try {
        const { lunches, members }  = yield call(
            requestAction,
            lunchesActionsCreators.setLunchesRequestStatus,
            call([lunchesService, lunchesService.getAllLunches])
        );

        yield put(lunchesActionsCreators.setLunches(lunches));
        yield put(membersActionsCreators.batchSetMembers(members));

    } catch (err) {
        console.info('Error when trying to fetch lunches.');
    }
}

export function* requestLunchSaga({ payload }: ReturnType<typeof lunchesSagaTriggers.requestLunch>) {
    try {
        const lunch = yield call(
            [lunchesService, lunchesService.sendRequestLunch],
            payload.location,
            payload.timeSpan
        );

        yield put(lunchesActionsCreators.createLunch(lunch));
    } catch (err) {
        console.info('Error when trying to request for a lunch.');
    }
}

export function* cancelLunchSaga({ payload: lunchId }: ReturnType<typeof lunchesSagaTriggers.cancelLunch>) {
    try {
        yield call([lunchesService, lunchesService.cancelRequestLunch], lunchId);
        yield put(lunchesActionsCreators.removeLunch(lunchId));
    } catch (err) {
        console.info('Error when trying to cancel a pending lunch.');
    }
}
