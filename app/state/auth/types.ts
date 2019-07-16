import { Request } from '../common/types';

export interface AuthState {
    loginRequest: Request;
    logoutRequest: Request;
    token: string | null;
    authStateDefined: boolean;
}

export enum AuthActions {
    LOGIN_SET_REQUEST_STATUS = 'AUTH/LOGIN_SET_REQUEST_STATUS',
    LOGOUT_SET_REQUEST_STATUS = 'AUTH/LOGOUT_SET_REQUEST_STATUS',
    SET_TOKEN = 'AUTH/SET_TOKEN',
    CLEAR_TOKEN = 'AUTH/CLEAR_TOKEN',
    DEFINE_AUTH_STATE = 'AUTH/DEFINE_AUTH_STATE'
}
