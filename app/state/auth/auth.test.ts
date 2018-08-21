import {authReducer} from "./reducer";
import {AuthActions, AuthState, Profile} from "./types";
import {RequestState} from "../common/types";
import {Reducer} from 'redux-testkit';
import {AuthActionsFactory} from "./actions";

describe('auth reducer', () => {
    let initialState: AuthState;

    beforeAll(() => {
        initialState = {
            request: {
                state: RequestState.none,
                errorMsg: ''
            },
            profile: null,
            token: '',
        };
    });

    test(`should have initial state`, () => {
        expect(authReducer()).toEqual(initialState);
    });

    test('should not change state when action does not exist', () => {
        Reducer(authReducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
    });

    describe('action creators', () => {
        test(AuthActions.SET_PROFILE, () => {
            const profile: Profile = {
                id: 'pId',
                name: 'pName',
                description: 'pDesc',
                photo: 'pPhotoUrl'
            };
            expect(AuthActionsFactory.setProfile(profile)).toEqual({ type: AuthActions.SET_PROFILE, payload: profile});
        });

        test(AuthActions.SET_TOKEN, () => {
            expect(AuthActionsFactory.setToken('abc')).toEqual({ type: AuthActions.SET_TOKEN, payload: 'abc'});
        });

        test(AuthActions.INVALIDATE_TOKEN, () => {
            expect(AuthActionsFactory.invalidateToken()).toEqual({ type: AuthActions.INVALIDATE_TOKEN });
        });
        test(AuthActions.START_REQUEST, () => {
            expect(AuthActionsFactory.startRequest()).toEqual({ type: AuthActions.START_REQUEST});
        });
        test(AuthActions.REQUEST_SUCCESS, () => {
            expect(AuthActionsFactory.requestSuccess()).toEqual({ type: AuthActions.REQUEST_SUCCESS});
        });
        test(AuthActions.REQUEST_FAIL, () => {
            const errorMsg = "Shit happens";
            expect(AuthActionsFactory.requestFail(errorMsg)).toEqual({ type: AuthActions.REQUEST_FAIL, payload: errorMsg});
        });
    });

    test(`${AuthActions.SET_PROFILE} - should set profile`, () => {
        const profile: Profile = {
            id: 'pId',
            name: "pName",
            description: "pDescription",
            photo: "pPhotoUrl"
        };

        const changedProfile: Profile = {
            id: "changedId",
            name: "changedName",
            description: "changedDesc",
            photo: "changedPhotoUrl"
        };

        const setAction = AuthActionsFactory.setProfile(profile);
        Reducer(authReducer).expect(setAction).toReturnState({...initialState, profile});
        const changeAction = AuthActionsFactory.setProfile(changedProfile);
        Reducer(authReducer).expect(changeAction).toReturnState({...initialState, profile: changedProfile});
    });

    describe('token actions', () => {
        let token: string;
        beforeAll(() => {
            token = "someRandomToken1234567890";
        });

        test(`${AuthActions.SET_TOKEN} - should set token`, () => {
            const setAction = AuthActionsFactory.setToken(token);
            Reducer(authReducer).expect(setAction).toReturnState({...initialState, token});
        });

        test(`${AuthActions.INVALIDATE_TOKEN} - should invalidate token`, () => {
            const stateWithToken = {...initialState, token };
            const invalidateAction = AuthActionsFactory.invalidateToken();
            Reducer(authReducer).withState(stateWithToken).expect(invalidateAction).toReturnState({...initialState});
        });
    });

    describe('request actions', () => {
        let requestInProgressState: AuthState;
        beforeAll(() => {
            requestInProgressState = {
                ...initialState,
                request: {
                    state: RequestState.inProgress,
                    errorMsg: ''
                }
            };
        });

        test(`${AuthActions.START_REQUEST} - should reflect request start state`, () => {
            const startAction = AuthActionsFactory.startRequest();
            Reducer(authReducer).expect(startAction).toReturnState({
                ...initialState,
                request: {
                    state: RequestState.inProgress,
                    errorMsg: ''
                }
            });
        });

        test(`${AuthActions.REQUEST_SUCCESS} - should reflect request success state`, () => {
            const successAction = AuthActionsFactory.requestSuccess();
            Reducer(authReducer).withState(requestInProgressState).expect(successAction).toReturnState({
                ...initialState,
                request: {
                    state: RequestState.succeeded,
                    errorMsg: ''
                }
            });
        });

        test(`${AuthActions.REQUEST_FAIL} - should reflect request failed state`, () => {
            const errorMsg = 'Shit happens';
            const failAction = AuthActionsFactory.requestFail(errorMsg);
            Reducer(authReducer).withState(requestInProgressState).expect(failAction).toReturnState({
                ...initialState,
                request: {
                    state: RequestState.failed,
                    errorMsg: errorMsg
                }
            });
        });
    });
});