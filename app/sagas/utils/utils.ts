import { UserData } from "@app/sagas/loginSaga/loginSaga";
import { UserDataRequest } from "@app/api/accountService/accountService";
import pushNotificationService from "@app/api/pushNotificationService/pushNotificationService";

export const hasKey = <T>(str: T, key: string): boolean => !!(str && str[key]);
export const keyToString = <T>(str: T, key: string): string => str && str[key] && str[key].toString();

export const mapDataToResponse = (userData: UserData, provider: 'facebook' | 'google', token: string): UserDataRequest => ({
    loginProvider: provider,
    loginProviderToken: token,
    id: userData.id || '',
    deviceId: pushNotificationService.getDeviceIdToken()
});