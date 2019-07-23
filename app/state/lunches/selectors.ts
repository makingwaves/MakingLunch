import {AppState} from '../state';
import {RequestState} from "@app/state/common/types";

const lunchesSelector = (state: AppState) => state.lunches;
export const getIfLunchesLoading = (state: AppState) => state.lunches.request.state === RequestState.inProgress;
export const getLunchesError = (state: AppState) => state.lunches.request.errorMsg;
