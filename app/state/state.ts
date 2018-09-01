import {combineReducers} from 'redux';
import {AuthState} from './auth/types';
import {authReducer} from './auth/reducer';
import {MembersState} from './members/types';
import {membersReducer} from './members/reducer';

export interface AppState {
    auth: AuthState;
    members: MembersState;
}

export default combineReducers({
    auth: authReducer,
    members: membersReducer,
});
