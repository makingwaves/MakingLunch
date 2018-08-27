import {makeAction} from '../../utils/redux';
import {Member, MembersMap, MembersActions} from './types';

export const membersActionsCreator = {
    setMember: (member: Member) => makeAction(MembersActions.SET_MEMBER, member),
    batchSetMembers: (members: MembersMap) => makeAction(MembersActions.BATCH_SET_MEMBERS, members),
    removeMember: (id: string) => makeAction(MembersActions.REMOVE_MEMBER, id),
    removeAllMembers: () => makeAction(MembersActions.REMOVE_ALL_MEMBERS),
    startRequest: () => makeAction(MembersActions.START_REQUEST),
    requestSuccess: () => makeAction(MembersActions.REQUEST_SUCCESS),
    requestFail: (errorMsg: string) => makeAction(MembersActions.REQUEST_FAIL, errorMsg),
};
