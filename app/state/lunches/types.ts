import {Request} from '../common/types';

export interface Message {
    memberId: number;
    time: string;
    message: string;
}

export interface Chat {
    [messageId: string]: Message;
}

export interface TimeSpan {
    start: string;
    end: string;
}

export interface LunchTimeMap {
    [memberId: string]: TimeSpan;
}

export enum LunchStatus {
    pending = 'PENDING',
    running = 'RUNNING',
    finished = 'FINISHED',
}

export interface Location {
    latitude: number;
    longitude: number;
    range: number;
}

export interface LunchLocationMap {
    [memberId: string]: Location;
}

export interface Lunch {
    id: string;
    status: LunchStatus;
    locations: LunchLocationMap;
    times: LunchTimeMap;
    members: string[];
    chat: Chat;
}

export interface LunchesMap {
    [lunchId: string]: Lunch;
}

export interface LunchesState {
    request: Request;
    data: LunchesMap;
}

export enum LunchActions {
    CREATE_LUNCH = '@@lunches/create_lunch',

    START_REQUEST = '@@lunches/start_request',
    REQUEST_SUCCESS = '@@lunches/request_success',
    REQUEST_FAIL = '@@lunches/request_fail',
}
