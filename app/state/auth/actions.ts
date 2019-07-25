import { makeAction } from '@app/state/common/actionCreators';
import { AuthActions } from './types';
import { Request } from "@app/state/common/types";

export const authActionsCreators = {
    setToken: (token: string | null) => makeAction(AuthActions.SET_TOKEN, token),
    clearToken: () => makeAction(AuthActions.CLEAR_TOKEN),
    defineAuthState: () => makeAction(AuthActions.DEFINE_AUTH_STATE),
    loginSetRequestStatus: (requestStatus: Request) => makeAction(AuthActions.LOGIN_SET_REQUEST_STATUS, requestStatus),
    logoutSetRequestStatus: (requestStatus: Request) => makeAction(AuthActions.LOGOUT_SET_REQUEST_STATUS, requestStatus),
};
