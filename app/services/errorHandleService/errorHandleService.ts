import { AxiosError } from "axios";

export interface ErrorResponse {
    message: string;
};

class ErrorHandleService {
    private errorMessagesFromCode: { [key: number]: string } = {
        403: 'Forbidden.'
    };

    public getErrorMessage(err: AxiosError, customErrorMessage: string): Promise<ErrorResponse> {
        return Promise.reject({ message: this.mapMessage(err, customErrorMessage) });
    }

    private mapMessage(err: AxiosError, customErrorMessage: string): string {
        return err && typeof err === 'object' ? this.getMessageFromResponse(err.message, err.code, customErrorMessage) : customErrorMessage;
    }

    private getMessageFromResponse(msg: string, code: string, customErrorMessage: string): string {
        if (msg)
            return msg;
        if (code)
            return this.errorMessagesFromCode[code];
        return customErrorMessage;
    }
}

export default ErrorHandleService;