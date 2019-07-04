import { combineReducers } from 'redux';
import { AuthState } from './auth/types';
import { authReducer } from './auth/reducer';
import { MembersState } from './members/types';
import { membersReducer } from './members/reducer';
import { LunchesState } from './lunches/types';
import { lunchesReducer } from './lunches/reducer';
import { ProfileState } from "@app/state/profile/types";
import { profileReducer } from "@app/state/profile/reducer";
import {ChatState} from "@app/state/chat/types";
import {chatReducer} from "@app/state/chat/reducer";

export interface AppState {
    auth: AuthState;
    profile: ProfileState;
    members: MembersState;
    lunches: LunchesState;
    chat: ChatState;
}

export default combineReducers<AppState>({
    auth: authReducer,
    profile: profileReducer,
    members: membersReducer,
    lunches: lunchesReducer,
    chat: chatReducer,
});
