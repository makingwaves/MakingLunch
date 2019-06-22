import {Action} from "redux";
import {ActionWithPayload} from "./types";

export function makeAction<T extends string>(type: T): Action<T>;
export function makeAction<T extends string, P>(type: T, payload: P): ActionWithPayload<P>;
export function makeAction<T extends string, P>(type: T, payload?: P) {
    return payload ? { type, payload } : { type };
}
