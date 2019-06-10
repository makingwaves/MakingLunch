import { combineReducers } from 'redux';
import { GeneralState } from "./general/types"
import { generalReduce } from "./general/reducer"
import { AuthState } from './auth/types';
import { authReducer } from './auth/reducer';
import { MembersState } from './members/types';
import { membersReducer } from './members/reducer';
import { LunchesState } from './lunches/types';
import { lunchesReducer } from './lunches/reducer';


export interface AppState {
    general: GeneralState;
    auth: AuthState;
    members: MembersState;
    lunches: LunchesState;
}

export default combineReducers({
    general: generalReduce,
    auth: authReducer,
    members: membersReducer,
    lunches: lunchesReducer
});
