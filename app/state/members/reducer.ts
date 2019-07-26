import { Reducer } from 'redux';

import { ActionUnion } from '@app/utils/redux';
import { RequestState } from '../common/types';
import { membersActionsCreators } from './actions';
import { MembersActions, MembersState, MembersMap } from './types';

const initialState: MembersState = {
    requestState: RequestState.none,
    data: {},
};

type MembersAction = ActionUnion<typeof membersActionsCreators>;

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
                requestState: RequestState.inProgress
            };
        case MembersActions.REQUEST_SUCCESS:
            return {
                ...state,
                requestState: RequestState.succeeded
            };
        case MembersActions.REQUEST_FAIL:
            return {
                ...state,
                requestState: RequestState.failed
            };
        default:
            return state;
    }
};
