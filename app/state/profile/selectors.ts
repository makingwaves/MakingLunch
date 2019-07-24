import { createSelector } from 'reselect';
import { AppState } from '../state';
import {RequestState} from "@app/state/common/types";

const profileSelector = (state: AppState) => state.profile;

export const getIfProfileLoading = (state: AppState) => state.lunches.request.state === RequestState.inProgress;
export const getProfileError = (state: AppState) => state.lunches.request.errorMsg;

export const getProfile = createSelector(
    profileSelector,
    (profileState) => profileState.data,
);
