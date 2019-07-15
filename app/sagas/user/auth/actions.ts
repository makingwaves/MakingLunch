import { makeAction } from '@app/utils/redux';

export enum AuthSagaTriggeringActions {
    facebookLogin = 'AUTH/SAGA/FACEBOOK_LOGIN',
    googleLogin = 'AUTH/SAGA/GOOGLE_LOGIN',
    logout = 'AUTH/SAGA/LOGOUT',
}

export const authSagaTriggers = {
    facebookLogin: () => makeAction(AuthSagaTriggeringActions.facebookLogin),
    googleLogin: () => makeAction(AuthSagaTriggeringActions.googleLogin),
    logout: () => makeAction(AuthSagaTriggeringActions.logout),
};
