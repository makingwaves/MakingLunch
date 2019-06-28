import { makeAction } from "@app/state/common/actionCreators";
import { Member, MembersMap, MembersActions } from './types';

export const membersActionsCreators = {
    setMember: (member: Member) => makeAction(MembersActions.SET_MEMBER, member),
    batchSetMembers: (members: MembersMap) => makeAction(MembersActions.BATCH_SET_MEMBERS, members),
    removeMember: (id: string) => makeAction(MembersActions.REMOVE_MEMBER, id)
};
