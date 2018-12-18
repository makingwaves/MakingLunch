
import httpClient from '../httpClient';
import { ErrorHandleService } from '../../services';
import { ErrorResponse } from '../../services/errorHandleService/errorHandleService';

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
}

const accountService = new AccountService;

export default accountService;