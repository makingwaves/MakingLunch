import { Reducer } from 'redux';

import { ActionUnion } from '@app/utils/redux';
import { generalActionsCreators } from "./actions"
import { GeneralState, GeneralActions } from "./types"

const initialState: GeneralState = {
    network_connection_state: null
};

type GeneralAction = ActionUnion<typeof generalActionsCreators>;

export const generalReduce: Reducer<GeneralState> = (state: GeneralState = initialState, action: GeneralAction) => {
    switch (action.type) {
        case GeneralActions.SET_NETWORK_CONNECTION_STATE:
            return {
                ...state,
                network_connection_state: action.payload
            };
    }
    return state;
};