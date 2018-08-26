import {Action, ActionCreatorsMapObject} from 'redux';

export interface ActionWithPayload<P> extends Action {
    payload: P;
}

export type ActionUnion<T extends ActionCreatorsMapObject> = ReturnType<T[keyof T]>;

export function makeAction<T extends string>(type: T): Action;
export function makeAction<T extends string, P>(type: T, payload: P): ActionWithPayload<P>;
export function makeAction<T extends string, P>(type: T, payload?: P) {
    return payload ? {type, payload} : {type};
}
