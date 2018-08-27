import { ActionUnion } from '../../utils/redux';
import { membersActionsCreator } from './actions';
import { Reducer } from 'redux';
import {MembersActions, MembersState, MembersMap} from './types';
import { RequestState } from '../common/types';

const initialState: MembersState = {
    request: {
        state: RequestState.none,
        errorMsg: '',
    },
    data: {},
};

type MembersAction = ActionUnion<typeof membersActionsCreator>;

export const membersReducer: Reducer<MembersState> = (state: MembersState = initialState, action: MembersAction) => {
    switch (action.type) {
        case MembersActions.SET_MEMBER:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.id]: action.payload,
                },
            };
        case MembersActions.BATCH_SET_MEMBERS:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
            };
        case MembersActions.REMOVE_MEMBER:
            return {
                ...state,
                data: Object
                    .keys(state.data)
                    .reduce((accumulator: MembersMap, key) => {
                        if (key !== action.payload) {
                            accumulator[key] = state.data[key];
                        }
                        return accumulator;
                    }, {}),
            };
        case MembersActions.REMOVE_ALL_MEMBERS:
            return {
                ...state,
                data: {},
            };
        case MembersActions.START_REQUEST:
            return {
                ...state,
                request: {
                    state: RequestState.inProgress,
                    errorMsg: '',
                },
            };
        case MembersActions.REQUEST_SUCCESS:
            return {
                ...state,
                request: {
                    state: RequestState.succeeded,
                    errorMsg: '',
                },
            };
        case MembersActions.REQUEST_FAIL:
            return {
                ...state,
                request: {
                    state: RequestState.failed,
                    errorMsg: action.payload,
                },
            };
        default:
            return state;
    }
};
