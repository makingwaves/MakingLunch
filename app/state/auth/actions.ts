import {Profile, AuthActions} from "./types";
import {makeAction} from "../../utils/redux";

export const AuthActionsMap = {
    setProfile: (profile: Profile) => makeAction(AuthActions.SET_PROFILE, profile),
    setToken: (token: string) => makeAction(AuthActions.SET_TOKEN, token),
    invalidateToken: () => makeAction(AuthActions.INVALIDATE_TOKEN),
    startRequest: () => makeAction(AuthActions.START_REQUEST),
    requestSuccess: () => makeAction(AuthActions.REQUEST_SUCCESS),
    requestFail: () => makeAction(AuthActions.REQUEST_FAIL)
};