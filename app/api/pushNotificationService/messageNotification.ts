import PushNotification from 'react-native-push-notification';

import store from "@app/boot/store";
import { Notification } from "./pushNotificationService";
import { LunchActions, AddChatMessagePayload, MessageStatus } from "@app/state/lunches/types";

export type MessageNotificationType = {
    'gcm.notification.LunchId': string,
    'gcm.notification.Message': string,
    'gcm.notification.MessageId': string,
    'gcm.notification.Time': string,
    'gcm.notification.UserId': string
};

export type MessageNotificationTitle = 'New message';

class MessageNotification implements Notification {
    private readonly mainDataKey: string = 'gcm.notification.';
    private readonly correctKeys: string[] = [
        'LunchId', 'MessageId', 'Time', 'Message', 'UserId'
    ]

    public notification(title: MessageNotificationTitle, data: MessageNotificationType): void {
        const messageData: AddChatMessagePayload = this.getMessageObject(data);

        store.dispatch({ type: LunchActions.ADD_CHAT_MESSAGE, payload: messageData });

        PushNotification.localNotification({
            title: title,
            message: messageData.message.message,
            lunchId: messageData.lunchId
        } as any);
    }

    private getMessageObject(data: MessageNotificationType): AddChatMessagePayload {
        return data && Object.keys(data)
            .filter(key =>
                key.includes(this.mainDataKey) && this.correctKeys.includes(this.replaceMainDataKey(key))
            )
            .reduce((obj, key) => {
                const objKey: string = this.changeUserToMemberKey(
                    this.upperCaseFirstLetter(this.replaceMainDataKey(key))
                );
                return (objKey === 'lunchId' ? obj[objKey] = data[key] : obj['message'][objKey] = data[key], obj);
            }, { message: { status: MessageStatus.finished } } as AddChatMessagePayload);
    }

    private upperCaseFirstLetter(str: string): string {
        return str && str.charAt(0).toLocaleLowerCase() + str.slice(1);
    }

    private replaceMainDataKey(str: string): string {
        return str && str.replace(this.mainDataKey, '');
    }

    private changeUserToMemberKey(str: string): string {
        return str && (str === 'userId' ? 'memberId' : str);
    }
}

export default MessageNotification;