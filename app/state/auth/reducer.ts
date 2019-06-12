import { Reducer } from 'redux';

import { ActionUnion } from '@app/utils/redux';
import { RequestState } from '../common/types';
import { authActionsCreators } from './actions';
import { AuthActions, AuthState } from './types';

const initialState: AuthState = {
    request: {
        state: RequestState.none,
        errorMsg: '',
    },
    profile: null,
    token: null,
};

type AuthAction = ActionUnion<typeof authActionsCreators>;

export const authReducer: Reducer<AuthState> = (state: AuthState = initialState, action: AuthAction) => {
    switch (action.type) {
        case AuthActions.SET_PROFILE:
            return {
                ...state,
                profile: action.payload,
            };
        case AuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case AuthActions.CLEAR_TOKEN:
            return {
                ...state,
                token: null,
            };
        case AuthActions.START_REQUEST:
            return {
                ...state,
                request: {
                    state: RequestState.inProgress,
                    errorMsg: '',
                },
            };
        case AuthActions.REQUEST_SUCCESS:
            return {
                ...state,
                request: {
                    state: RequestState.succeeded,
                    errorMsg: '',
                },
            };
        case AuthActions.REQUEST_FAIL:
            return {
                ...state,
                request: {
                    state: RequestState.failed
                },
            };
        default:
            return state;
    }
};
