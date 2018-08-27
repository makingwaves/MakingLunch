import {combineReducers} from 'redux';
import {AuthState} from './auth/types';
import {authReducer} from './auth/reducer';

export interface AppState {
    auth: AuthState;
}

export default combineReducers({
    auth: authReducer,
});
