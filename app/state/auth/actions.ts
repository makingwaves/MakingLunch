import { makeAction } from '@app/state/common/actionCreators';
import { AuthActions } from './types';
import { Request } from "@app/state/common/types";

export const authActionsCreators = {
    setToken: (token: string) => makeAction(AuthActions.SET_TOKEN, token),
    clearToken: () => makeAction(AuthActions.CLEAR_TOKEN),
    loginSetRequestStatus: (requestStatus: Request) => makeAction(AuthActions.LOGIN_SET_REQUEST_STATUS, requestStatus),
    logoutSetRequestStatus: (requestStatus: Request) => makeAction(AuthActions.LOGIN_SET_REQUEST_STATUS, requestStatus),
};
