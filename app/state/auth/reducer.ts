import { authActionsCreators } from './actions';
import { AuthActions, AuthState } from './types';
import {createReducer, GenericReducer} from "@app/state/common/reducers";
import { ActionWithPayload, Request, RequestState, ActionUnion } from "@app/state/common/types";

type AuthActionUnion = ActionUnion<typeof authActionsCreators>;

const initialState: AuthState = {
    loginRequest: {
        state: RequestState.none,
        errorMsg: '',
    },
    logoutRequest: {
        state: RequestState.none,
        errorMsg: '',
    },
    token: null,
    authStateDefined: false
};

class AuthReducer extends GenericReducer<AuthState, AuthActionUnion, AuthActions> {

    constructor(authState:AuthState) {
        super(authState);

        this.reducerMap.set(AuthActions.LOGIN_SET_REQUEST_STATUS, this.setLoginRequestStatus);
        this.reducerMap.set(AuthActions.LOGOUT_SET_REQUEST_STATUS, this.setLogoutRequestStatus);
        this.reducerMap.set(AuthActions.SET_TOKEN, this.setToken);
        this.reducerMap.set(AuthActions.CLEAR_TOKEN, this.clearToken);
        this.reducerMap.set(AuthActions.DEFINE_AUTH_STATE, this.defineAuthState);
    }

    private setLoginRequestStatus = (state: AuthState, action: ReturnType<typeof authActionsCreators.loginSetRequestStatus>) : AuthState => {
        return {
            ...state,
            loginRequest: action.payload
        }
    };

    private setLogoutRequestStatus = (state: AuthState, action: ReturnType<typeof authActionsCreators.loginSetRequestStatus>) : AuthState => {
        return {
            ...state,
            logoutRequest: action.payload
        }
    };

    private setToken = (state: AuthState, action: ReturnType<typeof authActionsCreators.setToken>) : AuthState => {
        return {
            ...state,
            token: action.payload
        }
    };

    private clearToken = (state: AuthState) : AuthState => {
        return {
            ...state,
            token: null
        }
    };

    private defineAuthState = (state: AuthState) : AuthState => {
        return {
            ...state,
            authStateDefined: true
        }
    };
}

export const authReducer = createReducer(new AuthReducer(initialState));

