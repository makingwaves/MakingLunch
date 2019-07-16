import {AppState} from '../state';
import {RequestState} from "@app/state/common/types";

const authSelector = (state: AppState) => state.auth;
export const getIfLoginLoading = (state: AppState) => state.auth.loginRequest.state === RequestState.inProgress;
export const getLoginError = (state: AppState) => state.auth.loginRequest.errorMsg;

export const getIfLogoutLoading = (state: AppState) => state.auth.logoutRequest.state === RequestState.inProgress;
export const getLogoutError = (state: AppState) => state.auth.logoutRequest.errorMsg;

export const getToken = (state: AppState) => state.auth.token;
export const getIfAuthStateDefined = (state: AppState) => state.auth.authStateDefined;