
import { put, call } from 'redux-saga/effects';
import { lunchesActionsCreators } from '@app/state/lunches/actions';
import { membersActionsCreators } from '@app/state/members/actions';
import lunchesService, { MeetingRequest } from '@app/api/lunchesService/lunchesService';

import {requestAction} from "@app/sagas/common/requests";


export function* getLunchesSaga() {
    try {
        const { lunches, members }  = yield call(
            requestAction,
            lunchesActionsCreators.setLunchesRequestStatus,
            call([lunchesService, lunchesService.getLunches])
        );

        yield put(lunchesActionsCreators.setLunches(lunches));
        yield put(membersActionsCreators.batchSetMembers(members));

    } catch (err) {
        console.info('Error when trying to fetch lunches.');
    }
}

export function* requestLunchSaga({ payload }: { type: string, payload: MeetingRequest }) {
    try {
        yield put(lunchesActionsCreators.clearErrorMessage());

        const lunch = yield call(
            [lunchesService, lunchesService.postLunch],
            payload
        );

        yield put(lunchesActionsCreators.createLunch(lunch));
    } catch (err) {
        console.info('Error when trying to search for lunch.');
    }
}

export function* cancelLunchSaga({ lunchId }: { type: string, lunchId: string }) {
    try {
        yield put(lunchesActionsCreators.clearErrorMessage());
        yield put(lunchesActionsCreators.setLunchCancellation({ lunchId: lunchId, isCancelling: true }));
        yield call([lunchesService, lunchesService.deleteMeetingRequest], lunchId);
        yield put(lunchesActionsCreators.removeLunch(lunchId));
    } catch (err) {
        yield put(lunchesActionsCreators.setLunchCancellation({ lunchId: lunchId, isCancelling: false }));
        console.info('Error when trying to cancel pending lunch.');

    }
}