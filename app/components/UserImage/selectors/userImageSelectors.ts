import { createSelector } from 'reselect';

import { Member } from '@app/state/members/types';
import { AppState } from '@app/state/state';

const getMembers = (state: AppState, userId: string) => state.members.data[userId];

const getUserPhoto = (member: Member) => member && member.photo;

export const getGivenUserPhoto = createSelector(
    getMembers,
    member => getUserPhoto(member)
);
