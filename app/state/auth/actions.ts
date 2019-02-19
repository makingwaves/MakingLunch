import { makeAction } from '@app/utils/redux';
import { Profile, AuthActions } from './types';

export const authActionsCreators = {
    setProfile: (profile: Profile) => makeAction(AuthActions.SET_PROFILE, profile),
    setToken: (token: string) => makeAction(AuthActions.SET_TOKEN, token),
    clearToken: () => makeAction(AuthActions.CLEAR_TOKEN),
    startRequest: () => makeAction(AuthActions.START_REQUEST),
    requestSuccess: () => makeAction(AuthActions.REQUEST_SUCCESS),
    requestFail: (errorMsg: string) => makeAction(AuthActions.REQUEST_FAIL, errorMsg),
};
