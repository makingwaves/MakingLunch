import { createSelector } from 'reselect';
import { AppState } from '../state';

const profileSelector = (state: AppState) => state.profile;

export namespace ProfileSelector {
    export const profile = createSelector(
        profileSelector,
        (profileState) => profileState.data,
    );
}
