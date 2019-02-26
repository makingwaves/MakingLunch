import PushNotification from 'react-native-push-notification';

import store from "@app/boot/store";
import { Notification } from "./pushNotificationService";
import { LunchActions, AddChatMessagePayload, MessageStatus, Lunch } from "@app/state/lunches/types";
import lunchesService from '@app/api/lunchesService/lunchesService';

export type LunchAssingedNotifcationType = {
    'gcm.notification.LunchId': string
};

export interface LunchObjectDto {
    lunchId: string;
    meetingId: string;
};

export type LunchAssingedNotifcationTitle = 'Lunch was assigned';

class LunchAssingedNotifcation implements Notification {
    private readonly mainDataKey: string = 'gcm.notification.';
    private readonly correctKeys: string[] = [
        'LunchId', 'MeetingId'
    ];

    public notification(title: LunchAssingedNotifcationTitle, data: LunchAssingedNotifcationType): void {
        const lunchData: LunchObjectDto = this.getLunchObject(data);

        store.dispatch({ type: LunchActions.REMOVE_LUNCH, payload: lunchData.meetingId });

        lunchesService.getSingleLunch(lunchData.lunchId)
            .then(lunch => store.dispatch({ type: LunchActions.ADD_LUNCH, payload: lunch }));

        PushNotification.localNotification({
            title: title,
            message: 'You have been fitted to a new lunch.'
        });
    }

    private getLunchObject(data: LunchAssingedNotifcationType): LunchObjectDto {
        return data && Object.keys(data)
            .filter(key =>
                key.includes(this.mainDataKey) && this.correctKeys.includes(this.replaceMainDataKey(key))
            )
            .reduce((obj, key) => {
                const objKey: string = this.upperCaseFirstLetter(this.replaceMainDataKey(key))
                return (obj[objKey] = data[key], obj);
            }, {} as LunchObjectDto);
    }

    private upperCaseFirstLetter(str: string): string {
        return str && str.charAt(0).toLocaleLowerCase() + str.slice(1);
    }

    private replaceMainDataKey(str: string): string {
        return str && str.replace(this.mainDataKey, '');
    }
}

export default LunchAssingedNotifcation;