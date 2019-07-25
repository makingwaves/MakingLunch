

import Config from 'react-native-config';
import PushNotifications, { PushNotification } from 'react-native-push-notification';

export interface PushNotificationPayload extends PushNotification {
    'gcm.notification.Title': string;

}

class PushNotificationService {

    private notificationsHandlers: Map<string, ((paylaod: PushNotificationPayload) => void)[]>

    private deviceIdToken: string;

    constructor() {
        this.notificationsHandlers = new Map();
        this.configure();
    }

    private onRegister = (data: { os: string, token: string }): void => {
        this.deviceIdToken = data.token;
    }

    private onNotification = (payload: PushNotificationPayload) => {

        let notificationsHandlerTitle = payload["gcm.notification.Title"]

        if (this.notificationsHandlers.has(notificationsHandlerTitle)) {

            let notificationsHandler = this.notificationsHandlers.get(notificationsHandlerTitle);

            notificationsHandler.forEach(func => {
                func(payload);
            });
        }
    }

    private configure() {
        PushNotifications.configure({
            onRegister: this.onRegister,
            onNotification: this.onNotification,
            senderID: Config.PUSH_NOTIFICATION_SENDER_ID,
        })
    }

    public addNotificationHandler(title: string, notificationHandler: ((paylaod: PushNotificationPayload) => void)) {
        if (this.notificationsHandlers.has(title)) {
            let notficationHandlers = this.notificationsHandlers.get(title);
            notficationHandlers.push(notificationHandler);
            this.notificationsHandlers.set(title, notficationHandlers);
        }
        else {
            this.notificationsHandlers.set(title, [notificationHandler]);
        }

    }


    public removeNotificationHandler(title: string) {
        this.notificationsHandlers.delete(title);
    }

    public getDeviceIdToken(): string {
        return this.deviceIdToken;
    }

}

const pushNotificationService = new PushNotificationService();

export default pushNotificationService;

