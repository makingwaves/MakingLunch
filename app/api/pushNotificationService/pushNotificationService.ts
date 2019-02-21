import Config from 'react-native-config';
import PushNotifications, { PushNotification } from 'react-native-push-notification';

import MessageNotification, { MessageNotificationTitle, MessageNotificationType } from './messageNotification';

export type NotificationTitle = MessageNotificationTitle;

export type NotificationType = {
    'New message': MessageNotificationType
};

export interface NotificationData {
    title: NotificationTitle;
    body: NotificationType[NotificationTitle];
};

export type NotificationObject = {
    [key in NotificationTitle]: Notification;
};

export interface Notification {
    notification: (title: NotificationTitle, body: NotificationType[NotificationTitle]) => void;
};

export interface ExtendedNotification extends PushNotification {
    'gcm.notification.Title': NotificationTitle;
}

class PushNotificationService {
    private deviceIdToken: string;

    private notificationType: NotificationObject = {
        'New message': new MessageNotification
    };

    public configureNotification(): void {
        PushNotifications.configure({
            onRegister: this.onRegister,
            onNotification: this.onNotification,
            senderID: Config.SENDERID,
        })
    }

    public getDeviceIdToken(): string {
        return this.deviceIdToken;
    }

    private onRegister = (data: { os: string, token: string }): void => {
        this.deviceIdToken = data.token;
    }

    private onNotification = (data: ExtendedNotification & { notification: NotificationData }): void => {
        const title: NotificationTitle = this.getNotificationTitle(data);
        if (title && this.notificationType[title])
            this.notificationType[title].notification(title, data as any);
    }

    private getNotificationTitle(data: ExtendedNotification): NotificationTitle {
        return data["gcm.notification.Title"];
    }
}

const pushNotificationService = new PushNotificationService;

export default pushNotificationService;