import { CallEffect, put } from 'redux-saga/effects';
import { ActionWithPayload, Request, RequestState } from '@app/state/common/types';

export type RequestCreator = (request: Request) => ActionWithPayload<Request>;

export function* requestAction(requestCreator: RequestCreator, callEffect: CallEffect) {
    try {
        yield put(requestCreator({ state: RequestState.inProgress }));
        const response = yield callEffect;
        yield put(requestCreator({ state: RequestState.succeeded }));

        return response;
    } catch (e) {
        yield put(requestCreator({ state: RequestState.failed, errorMsg: e.message }));
        throw new Error(e)
    }
}