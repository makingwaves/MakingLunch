
import { takeLatest, put, call } from 'redux-saga/effects';

import { LunchSagaActions } from '../../state/lunches/types';
import { lunchesActionsCreators } from '../../state/lunches/actions';
import { hasKey } from '../utils/pureFn/pureFn';
import lunchesService, { LunchBasicResponse } from '../../api/lunchesService/lunchesService';

export function* getLunchesFlow() {
    try {
        yield put(lunchesActionsCreators.startRequest());
        const lunches = yield call(
            [lunchesService, lunchesService.getLunches]
        );

        yield put(lunchesActionsCreators.setLunches(lunches));
        yield put(lunchesActionsCreators.requestSuccess());
    } catch(err) {
        yield put(lunchesActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when trying to fetch lunches.'));
    }
}

export function* postLunchFlow({ data }: { type: string, data: LunchBasicResponse }) {
    try {
        yield put(lunchesActionsCreators.startRequest());
        console.log(data);
    } catch(err) {
        yield put(lunchesActionsCreators.requestFail(hasKey(err, 'message') ? err.message : 'Error when trying to search for lunch.'));
    }
}

export function* lunchesSaga() {
    yield takeLatest(LunchSagaActions.GET_LUNCHES, getLunchesFlow);
    yield takeLatest(LunchSagaActions.POST_LUNCH, postLunchFlow);
}