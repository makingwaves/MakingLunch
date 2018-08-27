import {combineReducers} from 'redux';
import {LunchRequestState} from './lunchRequest/types';
import {lunchRequestReducer} from './lunchRequest/reducer';
import {AuthState} from "./auth/types";
import {authReducer} from "./auth/reducer";

export interface AppState {
    lunchRequest: LunchRequestState;
    auth: AuthState;
}

export default combineReducers({
    lunchRequest: lunchRequestReducer,
    auth: authReducer,
});
