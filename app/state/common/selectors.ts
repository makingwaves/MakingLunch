import { Request, RequestState } from './types';

export const getRequestError = (request: Request) => request.errorMsg;

export const getRequestLoading = (request: Request) => request.state === RequestState.inProgress;
