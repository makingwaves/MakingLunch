export interface Request {
    state: RequestState;
    errorMsg: string;
}

export enum RequestState {
    none = "NONE",
    inProgress = "IN_PROGRESS",
    succeeded = "SUCCEEDED",
    failed = "FAILED"
}