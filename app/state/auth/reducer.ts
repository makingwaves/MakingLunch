import {AuthActions, AuthState} from "./types";
import {ActionUnion} from "../../utils/redux";
import {AuthActionsFactory} from "./actions";
import {Reducer} from "redux";
import {RequestState} from "../common/types";

const initialState: AuthState = {
    request: {
        state: RequestState.none,
        errorMsg: ''
    },
    profile: null,
    token: '',
};

type AuthAction = ActionUnion<typeof AuthActionsFactory>;

export const authReducer: Reducer<AuthState> = (state = initialState, action: AuthAction = { type: '' }) => {
    switch (action.type) {
        case AuthActions.SET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case AuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case AuthActions.INVALIDATE_TOKEN:
            return {
                ...state,
                token: ''
            };
        case AuthActions.START_REQUEST:
            return {
                ...state,
                request: {
                    state: RequestState.inProgress,
                    errorMsg: ''
                }
            };
        case AuthActions.REQUEST_SUCCESS:
            return {
                ...state,
                request: {
                    state: RequestState.succeeded,
                    errorMsg: ''
                }
            };
        case AuthActions.REQUEST_FAIL:
            return {
                ...state,
                request: {
                    state: RequestState.failed,
                    errorMsg: action.payload
                }
            };
        default:
            return state;
    }
};