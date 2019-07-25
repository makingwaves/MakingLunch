import { eventChannel, END } from 'redux-saga';
import pushNotificationService from '@app/services/pushNotificationService/pushNotificationService';

export function createPushNotificationEventChannel(notificationTitle) {
    return eventChannel(emitter => {

        pushNotificationService.addNotificationHandler(notificationTitle, function (payload) {
            emitter(payload);

        })

        return () => {
            pushNotificationService.removeNotificationHandler(notificationTitle);
        }

    }
    )
}

