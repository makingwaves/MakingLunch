import { Request } from '../common/types';

export interface BasicProfile {
    id: string;
    name: string;
    photo: string;
    description: string;
}

export interface Profile extends BasicProfile {
    meetingsNumber: number;
}

export interface AuthState {
    request: Request;
    profile: Profile | null;
    token: string | null;
}

export enum AuthActions {
    SET_PROFILE = '@@auth/set_profile',
    SET_TOKEN = '@@auth/set_token',
    CLEAR_TOKEN = '@@auth/clear_token',
    START_REQUEST = '@@auth/start_request',
    REQUEST_SUCCESS = '@@auth/request_success',
    REQUEST_FAIL = '@@auth/request_fail',
}

export enum AuthSagaActions {
    FACEBOOK_LOGIN = '@@auth/facebook_login',
    GOOGLE_LOGIN = '@@auth/google_login',
    GET_USER_DATA = '@@auth/get_user_data',
    GET_USER_TOKEN = '@@auth/GET_USER_TOKEN',
    UPDATE_USER_DATA = '@@auth/update_user_data',
    LOGOUT = '@@auth/logout'
}