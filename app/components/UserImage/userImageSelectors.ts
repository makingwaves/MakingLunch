import { createSelector } from 'reselect';

import { AppState } from '../../state/state';
import { Member } from '../../state/members/types';

const getMembers = (state: AppState, userId: string) => state.members.data[userId];

const getUserPhoto = (member: Member) => member && member.photo;

export const getGivenUserPhoto = createSelector(
    getMembers,
    member => getUserPhoto(member)
);
