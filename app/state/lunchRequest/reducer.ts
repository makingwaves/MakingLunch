import {Reducer} from 'redux';
import {ActionUnion} from '../../utils/redux';
import {ActionTypes, LunchRequestState} from './types';
import {LunchActionsMap} from './actions';

const initialState: LunchRequestState = {
    location: {
        latitude: 0,
        longitude: 0,
    },
    time: {
        start: '',
        end: '',
    },
    range: 0,
};

type LunchAction = ActionUnion<typeof LunchActionsMap>;

export const lunchRequestReducer: Reducer<LunchRequestState, LunchAction> =
    (state = initialState, action: LunchAction) => {
        switch (action.type) {
            case ActionTypes.SET_TIME:
                return {
                    ...state,
                    time: {
                        start: action.payload.start,
                        end: action.payload.end,
                    },
                };
            case ActionTypes.SET_LOCATION:
                return {
                    ...state,
                };
            case ActionTypes.SET_RADIUS:
                return state;
            default:
                return state;
        }
    };
