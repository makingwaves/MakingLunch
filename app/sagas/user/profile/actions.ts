import { makeAction } from '@app/utils/redux';
import {Profile} from "@app/state/profile/types";

export enum ProfileSagaTriggeringActions {
    getProfile = 'PROFILE/SAGA/GET_PROFILE',
    updateProfile = 'PROFILE/SAGA/UPDATE_PROFILE',
}

export const profileSagaTriggers = {
    getProfile: () => makeAction(ProfileSagaTriggeringActions.getProfile),
    updateProfile: (profile: Profile) => makeAction(ProfileSagaTriggeringActions.updateProfile, profile),
};
