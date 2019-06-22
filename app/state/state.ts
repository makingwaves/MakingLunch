import { combineReducers } from 'redux';
import { AuthState } from './auth/types';
import { authReducer } from './auth/reducer';
import { MembersState } from './members/types';
import { membersReducer } from './members/reducer';
import { LunchesState } from './lunches/types';
import { lunchesReducer } from './lunches/reducer';
import { ProfileState } from "@app/state/profile/types";
import { profileReducer } from "@app/state/profile/reducer";

export interface AppState {
    auth: AuthState;
    profile: ProfileState;
    members: MembersState;
    lunches: LunchesState;
}

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    members: membersReducer,
    lunches: lunchesReducer,
});
