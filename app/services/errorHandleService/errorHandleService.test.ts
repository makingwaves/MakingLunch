import { AxiosError } from 'axios';

import ErrorHandleService, { ErrorResponse } from './errorHandleService';

describe('ErrorHandleService', () => {
    const customMessage: string = 'My custom message.';

    let errorHandleService: ErrorHandleService;

    beforeAll(() => {
        errorHandleService = new ErrorHandleService;
    });

    it('should return promise', async () => {
        await expect(errorHandleService.getErrorMessage({ message: 'AxiosErrorMessage' } as any, customMessage))
            .toBeInstanceOf(Promise);
    });

    it('should return message from given error message', async () => {
        await expect(errorHandleService.getErrorMessage({ message: 'AxiosErrorMessage' } as any, customMessage))
            .rejects
            .toEqual({ message: 'AxiosErrorMessage' });
    });

    it('should return message from given error code', async () => {
        await expect(errorHandleService.getErrorMessage({ code: '403' } as any, customMessage))
            .rejects
            .toEqual({ message: 'Forbidden.' });
    });

    it('should return message from given customMessage value', async () => {
        await expect(errorHandleService.getErrorMessage({} as any, customMessage))
            .rejects
            .toEqual({ message: customMessage });
        await expect(errorHandleService.getErrorMessage(undefined, customMessage))
            .rejects
            .toEqual({ message: customMessage });
    });
});