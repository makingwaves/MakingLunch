import {Profile, AuthActions} from "./types";
import {makeAction} from "../../utils/redux";

export const AuthActionsFactory = {
    setProfile: (profile: Profile) => makeAction(AuthActions.SET_PROFILE, profile),
    setToken: (token: string) => makeAction(AuthActions.SET_TOKEN, token),
    invalidateToken: () => makeAction(AuthActions.INVALIDATE_TOKEN),
    startRequest: () => makeAction(AuthActions.START_REQUEST),
    requestSuccess: () => makeAction(AuthActions.REQUEST_SUCCESS),
    requestFail: (errorMsg: string) => makeAction(AuthActions.REQUEST_FAIL, errorMsg)
};