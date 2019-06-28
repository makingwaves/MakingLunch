import { profileActionsCreators } from './actions';
import { Profile, ProfileActions, ProfileState } from './types';
import { createReducer, GenericReducer } from "@app/state/common/reducers";
import { ActionWithPayload, Request, RequestState, ActionUnion } from "@app/state/common/types";

type ProfileActionUnion = ActionUnion<typeof profileActionsCreators>;

const initialState: ProfileState = {
    request: {
        state: RequestState.none,
        errorMsg: '',
    },
    data: null,
};

class ProfileReducer extends GenericReducer<ProfileState, ProfileActionUnion, ProfileActions> {

    constructor(profileState: ProfileState) {
        super(profileState);

        this.reducerMap.set(ProfileActions.SET_PROFILE_REQUEST_STATUS, this.setProfileRequestStatus);
        this.reducerMap.set(ProfileActions.SET_PROFILE, this.setProfile);
        this.reducerMap.set(ProfileActions.CLEAR_PROFILE, this.clearProfile);

    }


    private setProfileRequestStatus = (state: ProfileState, action: ActionWithPayload<Request>): ProfileState => {
        return {
            ...state,
            request: action.payload
        }
    };

    private setProfile = (state: ProfileState, action: ActionWithPayload<Profile>): ProfileState => {
        return {
            ...state,
            data: action.payload
        }
    };

    private clearProfile = (state: ProfileState): ProfileState => {
        return {
            ...state,
            data: null
        }
    }
}

export const profileReducer = createReducer(new ProfileReducer(initialState));

