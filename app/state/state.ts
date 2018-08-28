import {combineReducers} from 'redux';
import {AuthState} from './auth/types';
import {authReducer} from './auth/reducer';
import {LunchesState} from './lunches/types';
import {lunchesReducer} from './lunches/reducer';

export interface AppState {
    auth: AuthState;
    lunches: LunchesState;
}

export default combineReducers({
    auth: authReducer,
    lunches: lunchesReducer,
});
