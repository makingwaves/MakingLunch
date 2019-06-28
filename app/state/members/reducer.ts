import { membersActionsCreators } from './actions';
import { MembersActions, MembersState, MembersMap, Member } from './types';
import { GenericReducer, createReducer } from '../common/reducers';
import { ActionWithPayload, RequestState, ActionUnion } from "@app/state/common/types";


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

    private setMember = (state: MembersState, action: ActionWithPayload<Member>): MembersState => {

        return {
            ...state,
            data: {
                ...state.data,
                [action.payload.id]: action.payload,
            },
        };

    };

    private setBatchMembers = (state: MembersState, action: ActionWithPayload<MembersMap>): MembersState => {

        return {
            ...state,
            data: {
                ...state.data,
                ...action.payload,
            },
        };

    };

    private removeMember = (state: MembersState, action: ActionWithPayload<string>): MembersState => {

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

export const profileReducer = createReducer(new MemberReducer(initialState));