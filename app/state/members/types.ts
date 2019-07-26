import { RequestState } from '../common/types';

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
    requestState: RequestState;
    data: MembersMap;
}

export enum MembersActions {
    SET_MEMBER = '@@members/set_member',
    BATCH_SET_MEMBERS = '@@members/batch_set_members',
    REMOVE_MEMBER = '@@members/delete_member',
    REMOVE_ALL_MEMBERS = '@@members/delete_all_members',
    START_REQUEST = '@@members/start_request',
    REQUEST_SUCCESS = '@@members/request_success',
    REQUEST_FAIL = '@@members/request_fail',
}
