import {LunchActions, LunchesState} from './types';
import {RequestState} from '../common/types';
import {Reducer} from 'redux';
import {ActionUnion} from '../../utils/redux';
import {lunchesActionsCreator} from './actions';

const initialState: LunchesState = {
    request: {
        state: RequestState.none,
        errorMsg: '',
    },
    data: {},
};

type LunchAction = ActionUnion<typeof lunchesActionsCreator>;

export const lunchesReducer: Reducer<LunchesState> = (state: LunchesState = initialState, action: LunchAction) => {
    switch (action.type) {
        case LunchActions.CREATE_LUNCH:
            return state;
        case LunchActions.SET_LUNCH_STATUS:
            return state;
        case LunchActions.REMOVE_LUNCH:
            return state;
        case LunchActions.ADD_LUNCH_MEMBER:
            return state;
        case LunchActions.REMOVE_LUNCH_MEMBER:
            return state;
        case LunchActions.SET_LUNCH_LOCATION:
            return state;
        case LunchActions.SET_LUNCH_TIME:
            return state;
        case LunchActions.ADD_CHAT_MESSAGE:
            return state;
        case LunchActions.START_REQUEST:
            return state;
        case LunchActions.REQUEST_SUCCESS:
            return state;
        case LunchActions.REQUEST_FAIL:
            return state;
        default:
            return state;
    }
};
