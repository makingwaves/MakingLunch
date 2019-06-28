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
    SET_MEMBER = '@@members/set_member',
    BATCH_SET_MEMBERS = '@@members/batch_set_members',
    REMOVE_MEMBER = '@@members/delete_member'
}
