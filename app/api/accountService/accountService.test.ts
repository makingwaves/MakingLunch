
import accountService from './accountService';

interface RequestMock<T> {
    res: T;
    showMessageError: boolean;
    showCodeError: boolean;
};

const error = {
    code: '403',
    message: 'Error From Server.'
};

jest.mock('./../../config/axios', () => ({
    post: <T>(url: string, req: RequestMock<T>): Promise<T> => {
        if(req.res)
            return Promise.resolve(req.res);
        if(req.showMessageError)
            return Promise.reject({ message: error.message });
        if(req.showCodeError)
            return Promise.reject({ message: error.code });
        return Promise.reject({ });
    }
}))

describe('AccountService', () => {

    it('should resolve and get data from server', async () => {
        const requestData: any = { 
            res: { data: { name: 'MyName', surname: 'MySurname' } }
        };

        await expect(accountService.sendUserData(requestData))
            .resolves
            .toEqual(requestData.res.data);
    });

    it('should reject and get errorMessage value', async () => {
        const requestData: any = { 
            showMessageError: true
        };

        await expect(accountService.sendUserData(requestData))
            .rejects
            .toEqual({ message: error.message });
    });

    it('should reject and get codeErrorMessage value', async () => {
        const requestData: any = { 
            showCodeError: true
        };

        await expect(accountService.sendUserData(requestData))
            .rejects
            .toEqual({ message: '403' });
    });
});
