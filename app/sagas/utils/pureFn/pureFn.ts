import { UserData } from "../../loginSaga/loginSaga";
import { UserDataRequest } from "../../../api/accountService/accountService";

export const hasKey = <T>(str: T, key: string): boolean => !!(str && str[key]);
export const keyToString = <T>(str: T, key: string): string => str && str[key] && str[key].toString();

export const mapDataToResponse = (userData: UserData, provider: 'facebook' | 'google', token: string): UserDataRequest => ({
    name: userData.name || '',
    photo: userData.photo || '',
    description: userData.description || '',
    loginProvider: provider,
    loginProviderToken: token,
    id: userData.id || ''
});