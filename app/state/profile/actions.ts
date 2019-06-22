import {makeAction} from "@app/state/common/actionCreators";
import {ProfileActions, Profile} from "./types";
import {Request} from "@app/state/common/types";

export const profileActionsCreators = {
    setProfileRequestStatus: (requestStatus: Request) => makeAction(ProfileActions.SET_PROFILE_REQUEST_STATUS, requestStatus),
    setProfile: (profile: Profile) => makeAction(ProfileActions.SET_PROFILE, profile),
    clearProfile: () => makeAction(ProfileActions.CLEAR_PROFILE),
};