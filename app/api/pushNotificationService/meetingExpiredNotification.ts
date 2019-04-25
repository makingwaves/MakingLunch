
import dayjs from 'dayjs';
import PushNotification from 'react-native-push-notification';

import store from '@app/boot/store';
import { Notification } from './pushNotificationService';
import { LunchActions } from '@app/state/lunches/types';

export type MeetingExpiredNotificationType = {
    'gcm.notification.MeetingId': string;
    'gcm.notification.End': string;
    'gcm.notification.Begin': string;
};

export type MeetingExpiredNotificationTitle = 'Meeting canceled';

class MeetingExpiredNotification implements Notification {


    public notification(title: MeetingExpiredNotificationTitle, data: MeetingExpiredNotificationType): void {
        store.dispatch({ type: LunchActions.REMOVE_LUNCH, payload: data["gcm.notification.MeetingId"] });

        PushNotification.localNotification({
            title: 'Meeting expired',
            message: this.getMessage(data),
        } as any);
    }

    private getMessage(data: MeetingExpiredNotificationType): string {
        const [begin, end] = [this.mapDate(data["gcm.notification.Begin"]), this.mapDate(data["gcm.notification.End"])];

        return `The meeting from ${begin} to ${end} was not fitted!`;
    }

    private mapDate(str: string): string {
        return dayjs(str).format('HH:mm');
    }
}

export default MeetingExpiredNotification;