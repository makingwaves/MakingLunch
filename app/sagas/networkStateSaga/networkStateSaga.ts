import { eventChannel } from 'redux-saga';
import { call, take, put, select } from 'redux-saga/effects';
import { NetInfo } from 'react-native';
import { generalActionsCreators } from "../../state/general/actions";
import { appMessagesActionsCreators, MessageDuration } from "../../state/app_messages/actions";
import { getNetworkConnection } from "../../state/general/selectors";

const NO_NETWORK_MSG_ID = "no_network_warning"

function networkStateChannelFactory() {
    return eventChannel(emitter => {
        const onStateChangeHandler = (nextState: boolean) => {
            emitter(nextState);
        };

        NetInfo.isConnected.addEventListener('connectionChange', onStateChangeHandler);

        return () => {
            NetInfo.isConnected.removeEventListener('connectionChange', onStateChangeHandler);
        };
    });
}

export function* networkStateSaga() {

    const channel = yield call(networkStateChannelFactory);

    while (true) {
        const isConnected = yield take(channel);
        const lastConnectionStatus = yield select(getNetworkConnection);

        if (lastConnectionStatus !== isConnected) {
            if (!isConnected) {
                yield put(appMessagesActionsCreators.showWarningMessage({
                    id: NO_NETWORK_MSG_ID,
                    title: "Network",
                    message: "No network connection !",
                    duration: MessageDuration.INFINITE
                }));

            } else {
                yield put(appMessagesActionsCreators.hideAppMessage(NO_NETWORK_MSG_ID));
            }
        }

        yield put(generalActionsCreators.setNetworkConnectionState(isConnected));
    }
}