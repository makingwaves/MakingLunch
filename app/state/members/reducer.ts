import { membersActionsCreators } from './actions';
import { MembersActions, MembersState, MembersMap } from './types';
import { GenericReducer, createReducer } from '../common/reducers';
import { RequestState, ActionUnion } from "@app/state/common/types";


const initialState: MembersState = {
    request: {
        state: RequestState.none,
        errorMsg: '',
    },
    data: {},
};

type MembersActionUnion = ActionUnion<typeof membersActionsCreators>;


class MemberReducer extends GenericReducer<MembersState, MembersActionUnion, MembersActions> {

    constructor(membersState: MembersState) {
        super(membersState);

        this.reducerMap.set(MembersActions.SET_MEMBER, this.setMember);
        this.reducerMap.set(MembersActions.BATCH_SET_MEMBERS, this.setBatchMembers);
        this.reducerMap.set(MembersActions.REMOVE_MEMBER, this.removeMember)
    }

    private setMember = (state: MembersState, action: ReturnType<typeof membersActionsCreators.setMember>): MembersState => {

        return {
            ...state,
            data: {
                ...state.data,
                [action.payload.id]: action.payload,
            },
        };

    };

    private setBatchMembers = (state: MembersState, action: ReturnType<typeof membersActionsCreators.batchSetMembers>): MembersState => {

        return {
            ...state,
            data: {
                ...state.data,
                ...action.payload,
            },
        };

    };

    private removeMember = (state: MembersState, action: ReturnType<typeof membersActionsCreators.removeMember>): MembersState => {

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

    };
}

export const memberReducer = createReducer(new MemberReducer(initialState));