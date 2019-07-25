import Config from 'react-native-config';
import PushNotifications, { PushNotification } from 'react-native-push-notification';

import store from '@app/boot/store';
// import { Profile } from '@app/state/auth/types';
import { navigationService } from '@app/services';
import MessageNotification, { MessageNotificationTitle, MessageNotificationType } from './messageNotification';
import LunchAssingedNotifcation, { LunchAssingedNotifcationType, LunchAssingedNotifcationTitle } from './lunchAssingedNotification';
import MeetingExpiredNotification, { MeetingExpiredNotificationTitle, MeetingExpiredNotificationType } from './meetingExpiredNotification';

export type NotificationTitle = MessageNotificationTitle | LunchAssingedNotifcationTitle | MeetingExpiredNotificationTitle;

export type NotificationType = {
    'New message': MessageNotificationType,
    'Lunch was assigned': LunchAssingedNotifcationType,
    'Meeting canceled': MeetingExpiredNotificationType
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

export interface LocalNotifications {
    'New message': (lunchId: string) => void,
    'SplashScreen': () => void,
    'Lunch was assigned': () => void,
    'Meeting canceled': () => void
};

export interface ExtendedNotification extends PushNotification {
    'gcm.notification.Title': NotificationTitle;
}

class PushNotificationService {
    private deviceIdToken: string;

    private notificationType: NotificationObject = {
        'New message': new MessageNotification,
        'Lunch was assigned': new LunchAssingedNotifcation,
        'Meeting canceled': new MeetingExpiredNotification
    };
    private localNotificationRedirect: LocalNotifications = {
        'New message': this.onLocalNewMessageClick.bind(this),
        'Lunch was assigned': this.onLocalLunchAssignClick.bind(this),
        'SplashScreen': this.userNotLoggedClick.bind(this),
        'Meeting canceled': this.onLocalMeetingExpiredClick.bind(this)
    };

    public configureNotification(): void {

        PushNotifications.configure({
            onRegister: this.onRegister,
            onNotification: this.onNotification,
            senderID: Config.PUSH_NOTIFICATION_SENDER_ID,
            requestPermissions: true
        })
    }

    public getDeviceIdToken(): string {
        return this.deviceIdToken;
    }

    private onRegister = (data: { os: string, token: string }): void => {
        this.deviceIdToken = data.token;

    }

    private onNotification = (data: ExtendedNotification & { notification: NotificationData }): void => {
        if (data.userInteraction) {
            // const title: string = this.isUserLogged() ? data['title'] : 'SplashScreen';
            const title: string = data['title'];
            this.localNotificationRedirect[title] && this.localNotificationRedirect[title](data['lunchId']);
        }
        else {
            const title: NotificationTitle = this.getNotificationTitle(data);
            this.notificationType[title] && this.notificationType[title].notification(title, data as any);
        }
    }

    private getNotificationTitle(data: ExtendedNotification): NotificationTitle {
        return data["gcm.notification.Title"];
    }

    private onLocalNewMessageClick(lunchId: string): void {
        if (lunchId && typeof lunchId === 'string')
            navigationService.navigate('Chat', { lunch: { id: lunchId } });
    }

    private onLocalLunchAssignClick(): void {
        navigationService.navigate('Main');
    }

    private onLocalMeetingExpiredClick(): void {
        navigationService.navigate('Main');
    }

    private userNotLoggedClick(): void {
        navigationService.navigate('Initial');
    }

    // private isUserLogged(): boolean {
    //     const user: Profile = store.getState().auth.profile;
    //     return !!(user && user.id)
    // }
}

const pushNotificationService = new PushNotificationService;

export default pushNotificationService;