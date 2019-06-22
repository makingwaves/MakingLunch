import {Request} from "@app/state/common/types";

export interface Profile {
    id: string;
    name: string;
    photo: string;
    description: string;
}

export interface ProfileState {
    request: Request;
    data: Profile | null;
}

export enum ProfileActions {
    SET_PROFILE_REQUEST_STATUS = 'PROFILE/SET_PROFILE_REQUEST_STATUS',
    SET_PROFILE = 'PROFILE/SET_PROFILE',
    CLEAR_PROFILE = 'PROFILE/CLEAR_PROFILE',
}