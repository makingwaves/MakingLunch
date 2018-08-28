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

export interface AddLunchMemberPayload {
    memberId: string;
    timeSpan: TimeSpan;
    location: Location;
}

export enum LunchActions {
    CREATE_LUNCH = '@@lunches/create_lunch',
    SET_LUNCH_STATUS = '@@lunches/set_lunch_status',
    REMOVE_LUNCH = '@@lunches/remove_lunch',
    ADD_LUNCH_MEMBER = '@@lunches/add_lunch_member',
    REMOVE_LUNCH_MEMBER = '@@lunches/remove_lunch_member',
    SET_LUNCH_LOCATION = '@@lunches/change_lunch_location',
    SET_LUNCH_TIME = '@@lunches/change_lunch_time',
    ADD_CHAT_MESSAGE = '@@lunches/add_chat_message',
    START_REQUEST = '@@lunches/start_request',
    REQUEST_SUCCESS = '@@lunches/request_success',
    REQUEST_FAIL = '@@lunches/request_fail',
}
