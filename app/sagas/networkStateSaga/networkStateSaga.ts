import { eventChannel } from 'redux-saga';
import { call, take, put, select } from 'redux-saga/effects';
import { NetInfo } from 'react-native';
import { generalActionsCreators } from "../../state/general/actions";
import { getNetworkConnection } from "../../state/general/selectors";

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
    console.log("No network !!!");

    while (true) {
        const isConnected = yield take(channel);
        const lastConnectionStatus = yield select(getNetworkConnection);

        if (lastConnectionStatus !== isConnected) {
            if (!isConnected) {
                console.log("No network !!!");
            } else {
                console.log("Some network !");
            }
        }

        yield put(generalActionsCreators.setNetworkConnectionState(isConnected));
    }
}