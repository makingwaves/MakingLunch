import { call, put, select } from "redux-saga/effects";
import { Profile } from "@app/state/profile/types";
import { profile } from "@app/state/profile/selectors";
import { profileActionsCreators } from "@app/state/profile/actions";
import { accountService } from "@app/api";
import { requestAction } from "@app/sagas/common/requests";
import { profileSagaTriggers } from "@app/sagas/user/profile/actions";

export function* getProfileSaga() {
    try {
        const userProfile: Profile = yield select(profile);

        if (!userProfile) {
            const profileData: Profile = yield call(
                requestAction,
                profileActionsCreators.setProfileRequestStatus,
                call([accountService, accountService.getUserData]));

            yield put(profileActionsCreators.setProfile(profileData));
        }

        return;

    } catch (err) {
        console.info('Error when trying to fetch user data.');
    }
}

export function* updateProfileSaga({ payload }:  ReturnType<typeof profileSagaTriggers.updateProfile>) {
    try {
        const updatedUserData: Profile = yield call(
            requestAction,
            profileActionsCreators.setProfileRequestStatus,
            call([accountService, accountService.updateUserData], payload.name, payload.description));

        yield put(profileActionsCreators.setProfile(updatedUserData));
    } catch (err) {
        console.info('Error when trying to update user data.');
    }
}
