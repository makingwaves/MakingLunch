import { makeAction } from '@app/utils/redux';
import { GeneralActions } from './types';

export const generalActionsCreators = {
    setNetworkConnectionState: (state: boolean) =>
        makeAction(GeneralActions.SET_NETWORK_CONNECTION_STATE, state)
};