import { createSelector } from 'reselect';
import { AppState } from '../state';

const profileSelector = (state: AppState) => state.profile;

export const profile = createSelector(
    profileSelector,
    (profileState) => profileState.data,
);
