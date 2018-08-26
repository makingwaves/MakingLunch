import {combineReducers} from 'redux';
import {LunchRequestState} from './lunchRequest/types';
import {lunchRequestReducer} from './lunchRequest/reducer';

export interface AppState {
    lunchRequest: LunchRequestState;
}

export default combineReducers({
    lunchRequest: lunchRequestReducer,
});
