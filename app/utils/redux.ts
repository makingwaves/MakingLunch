import {Action, ActionCreatorsMapObject} from 'redux';

export interface ActionWithPayload<T, P> extends Action<T> {
    payload: P;
}

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>;

export function makeAction<T extends string>(type: T): Action<T>;
export function makeAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function makeAction<T extends string, P>(type: T, payload?: P) {
    return payload ? {type, payload} : {type};
}
