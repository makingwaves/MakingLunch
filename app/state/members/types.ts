import { Request } from '../common/types';

export interface Member {
    id: string;
    name: string;
    photo: string;
    description: string;
}

export interface MembersMap {
    [memberId: string]: Member;
}

export interface MembersState {
    request: Request;
    data: MembersMap;
}

export enum MembersActions {
    SET_MEMBER = 'MEMBERS/SET_MEMBER',
    BATCH_SET_MEMBERS = 'MEMBERS/BATCH_SET_MEMBERS',
    REMOVE_MEMBER = 'MEMBERS/DELETE_MEMBER'
}
