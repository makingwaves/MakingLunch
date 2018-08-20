import {AuthActions, AuthState} from "./types";
import {ActionUnion} from "../../utils/redux";
import {AuthActionsMap} from "./actions";
import {Reducer} from "redux";

const initalState: AuthState = {
    request: null,
    profile: null,
    token: '',
};

type AuthAction = ActionUnion<typeof AuthActionsMap>;

export const authReducer: Reducer<AuthState> = (state = initalState, action: AuthAction) => {
    switch (action.type) {
        case AuthActions.SET_PROFILE:
            return state;
        case AuthActions.SET_TOKEN:
            return state;
        case AuthActions.INVALIDATE_TOKEN:
            return state;
        case AuthActions.START_REQUEST:
            return state;
        case AuthActions.REQUEST_SUCCESS:
            return state;
        case AuthActions.REQUEST_FAIL:
            return state;
        default:
            return state;
    }
};