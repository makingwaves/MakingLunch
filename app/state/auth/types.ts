import {Request} from '../common/types';

export interface Profile {
    id: string;
    name: string;
    description: string;
    photo: string;
}

export interface AuthState {
    request: Request;
    profile: Profile|null;
    token: string;
}

export enum AuthActions {
    SET_PROFILE = '@@auth/set_profile',
    SET_TOKEN = '@@auth/set_token',
    CLEAR_TOKEN = '@@auth/clear_token',
    START_REQUEST = '@@auth/start_request',
    REQUEST_SUCCESS = '@@auth/request_success',
    REQUEST_FAIL = '@@auth/request_fail',
}
