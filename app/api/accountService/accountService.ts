
import httpClient from './../../config/axios';

import { ErrorHandleService } from '../../services';
import { ErrorResponse } from '../../services/errorHandleService/errorHandleService';
import { Profile } from '../../state/auth/types';

export interface UserDataRequest {
    name: string;
    description: string;
    photo: string;
    loginProvider: 'facebook' | 'google';
    loginProviderToken: string; // token from facebook / google
    id?: string; // facebook userId
};

export interface UserDataResponse {
    isNewUser: boolean; // first login
    token: string; // bearer token to api
};

class AccountService extends ErrorHandleService {

    public sendUserData(data: UserDataRequest): Promise<UserDataResponse | ErrorResponse> {
        return httpClient.post<UserDataResponse>('/api/Account/token', data)
            .then(res => res.data)
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to login.'));
    }

    public getUserData(): Promise<Profile | ErrorResponse> {
        return httpClient.get<Profile>('/api/Account')
            .then(res => res.data)
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to fetch User Data.'));
    }

    public getUserDataWithToken(token: string): Promise<Profile | ErrorResponse> {
        return httpClient.get<Profile>('/api/Account', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.data)
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to fetch User Data.'));
    }

    public updateUserData(name: string, description: string): Promise<Profile | ErrorResponse> {
        return httpClient.put<Profile>('/api/Account', {  
                    name, 
                    description
        })
            .then(res => res.data)
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to update User Data.'));
    }
}

const accountService = new AccountService;

export default accountService;