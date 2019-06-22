import { makeAction } from '@app/utils/redux';
import {Profile} from "@app/state/profile/types";

export const enum ProfileSagaTriggeringActions {
    getProfile = 'PROFILE/SAGA/GEP_PROFILE',
    updateProfile = 'PROFILE/SAGA/UPDATE_PROFILE',
}

export const profileSagaTriggers = {
    getProfile: () => makeAction(ProfileSagaTriggeringActions.getProfile),
    updateProfile: (profile: Profile) => makeAction(ProfileSagaTriggeringActions.updateProfile, profile),
};
