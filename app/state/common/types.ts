import { Action, ActionCreatorsMapObject } from 'redux';

export interface ActionWithPayload<P> extends Action<string> {
    payload: P;
}

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>;

export interface Request {
    state: RequestState;
    errorMsg?: string;
}

export enum RequestState {
    none = 'NONE',
    inProgress = 'IN_PROGRESS',
    succeeded = 'SUCCEEDED',
    failed = 'FAILED',
}
