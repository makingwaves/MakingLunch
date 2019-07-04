import {ActionUnion} from '@app/utils/redux';
import {RequestState} from '../common/types';
import {lunchesActionsCreators} from './actions';
import {LunchesActions, LunchesState} from './types';
import {createReducer, GenericReducer} from "@app/state/common/reducers";

type LunchesActionUnion = ActionUnion<typeof lunchesActionsCreators>;

const initialState: LunchesState = {
    request: {
        state: RequestState.none,
        errorMsg: '',
    },
    data: {},
};

class LunchesReducer extends GenericReducer<LunchesState, LunchesActionUnion, LunchesActions> {

    constructor(lunchesState: LunchesState) {
        super(lunchesState);

        this.reducerMap.set(LunchesActions.SET_LUNCHES_REQUEST_STATUS, this.setLunchesRequestStatus);
        this.reducerMap.set(LunchesActions.SET_LUNCHES, this.setLunches);
        this.reducerMap.set(LunchesActions.CREATE_LUNCH, this.createLunch);
        this.reducerMap.set(LunchesActions.REMOVE_LUNCH, this.removeLunch);
        this.reducerMap.set(LunchesActions.ADD_LUNCH_MEMBER, this.addLunchMember);
        this.reducerMap.set(LunchesActions.REMOVE_LUNCH_MEMBER, this.removeLunchMember);
    }

    private setLunchesRequestStatus = (
        state: LunchesState,
        action: ReturnType<typeof lunchesActionsCreators.setLunchesRequestStatus>
    ): LunchesState => {
        return {
            ...state,
            request: action.payload
        }
    };

    private setLunches = (
        state: LunchesState,
        action: ReturnType<typeof lunchesActionsCreators.setLunches>
    ): LunchesState => {
        return {
            ...state,
            data: action.payload
        }
    };

    private createLunch = (
        state: LunchesState,
        action: ReturnType<typeof lunchesActionsCreators.createLunch>
    ): LunchesState => {
        return {
            ...state,
            data: {
                ...state.data,
                [action.payload.id] : action.payload
            }
        }
    };

    private removeLunch = (
        state: LunchesState,
        action: ReturnType<typeof lunchesActionsCreators.removeLunch>
    ): LunchesState => {
        const {[action.payload]: value, ...dataWithoutItem } = state.data;

        return {
            ...state,
            data: dataWithoutItem
        };
    };

    private addLunchMember = (
        state: LunchesState,
        action: ReturnType<typeof lunchesActionsCreators.addLunchMember>
    ): LunchesState => {
        const { lunchId, lunchMember } = action.payload;

        return {
            ...state,
            data: {
                ...state.data,
                [lunchId]: {
                    ...state.data[lunchId],
                    members: [
                        ...state.data[lunchId].members,
                        lunchMember.memberId
                    ],
                    times: {
                        ...state.data[lunchId].times,
                        [lunchMember.memberId]: lunchMember.timeSpan
                    },
                    locations: {
                        ...state.data[lunchId].locations,
                        [lunchMember.memberId]: lunchMember.location
                    }
                }
            }
        }
    };

    private removeLunchMember = (
        state: LunchesState,
        action: ReturnType<typeof lunchesActionsCreators.removeLunchMember>
    ): LunchesState => {
        const { lunchId, memberId } = action.payload;
        const { [memberId]: memberTimeValue, ...timeDataWithoutMember } = state.data[lunchId].times;
        const { [memberId]: memberLocationValue, ...locationDataWithoutMember } = state.data[lunchId].locations;

        return {
            ...state,
            data: {
                ...state.data,
                [lunchId]: {
                    ...state.data[lunchId],
                    members: state
                        .data[lunchId]
                        .members
                        .filter(member => member !== memberId),
                    times: timeDataWithoutMember,
                    locations: locationDataWithoutMember
                }
            }
        }
    }
}

export const lunchesReducer = createReducer(new LunchesReducer(initialState));