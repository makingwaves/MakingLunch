import { take, put, call } from 'redux-saga/effects';
import { lunchesActionsCreators } from '@app/state/lunches/actions';
import { membersActionsCreators } from '@app/state/members/actions';
import lunchesService, { LunchDto } from '@app/api/lunchesService/lunchesService';
import { lunchesSagaTriggers } from "@app/sagas/lunches/actions";
import { requestAction } from "@app/sagas/common/requests";
import { normalizeLunch, normalizeLunches } from "@app/state/lunches/normalizer";
import { Member } from "@app/state/members/types";
import { createPushNotificationEventChannel } from "@app/sagas/common/pushNotification"

export function* getLunchesSaga() {
    try {
        const lunches: LunchDto[] = yield call(
            requestAction,
            lunchesActionsCreators.setLunchesRequestStatus,
            call([lunchesService, lunchesService.getAllLunches])
        );

        const members: Member[] = lunches.reduce<Member[]>((prev, current) => {
            return [...prev, ...current.lunchProposals.map(lunchProposal => lunchProposal.user)]
        }, [])

        yield put(lunchesActionsCreators.setLunches(normalizeLunches(lunches)));
        yield put(membersActionsCreators.batchSetMembers({}));

    } catch (err) {
        console.log(err);
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

        yield put(lunchesActionsCreators.createLunch(normalizeLunch(lunch)));
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

export function* lunchAssingedNotification() {
    const lunchAssignedEventChannel = yield call(createPushNotificationEventChannel, 'Lunch was assigned');

    while (true) {
        const lunchAssignedData = yield take(lunchAssignedEventChannel)
        //TODO: dalsza obsługa notyfikacji
    }
}

export function* canceledLunchNotification() {
    const canceledLunchEventChannel = yield call(createPushNotificationEventChannel, 'Meeting canceled');

    while (true) {
        const canceledLunchData = yield take(canceledLunchEventChannel)
        //TODO: dalsza obsługa notyfikacji
    }
}
