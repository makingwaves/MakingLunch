import { Request } from '../common/types';

export interface Profile {
    id: string;
    name: string;
    photo: string;
    meetingsNumber: number;
    description: string;
}

export interface AuthState {
    request: Request;
    profile: Profile|null;
    token: string|null;
}

export enum AuthActions {
    SET_PROFILE = '@@auth/set_profile',
    SET_TOKEN = '@@auth/set_token',
    CLEAR_TOKEN = '@@auth/clear_token',
    START_REQUEST = '@@auth/start_request',
    REQUEST_SUCCESS = '@@auth/request_success',
    REQUEST_FAIL = '@@auth/request_fail',
    FACEBOOK_LOGIN = '@@auth/facebook_login',
    GOOGLE_LOGIN = '@@auth/google_login',
    GET_USER_DATA = '@@auth/get_user_data',
    UPDATE_USER_DATA = '@@auth/update_user_data',
    LOGOUT = '@@auth/update_user_data'
}
