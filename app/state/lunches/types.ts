import { Request } from '../common/types';

// --- State interfaces:
export interface Message {
    messageId: string;
    memberId: string;
    time: string;
    message: string;
    status: MessageStatus;
}

export interface Chat {
    [messageId: string]: Message;
}

export enum MessageStatus {
    pending = 'PENDING',
    finished = 'FINISHED'
}

export interface TimeSpan {
    begin: string;
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
    radiusInMeters: number;
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

// --- Payload interfaces:
export interface CreateLunchPayload {
    lunchId: string;
    creatorId: string;
    location: Location;
    time: TimeSpan;
}

export interface UpdateLunchPayload {
    oldLunchId: string;
    newLunchId: string;
    status: LunchStatus;
    members: string[];
    times: LunchTimeMap;
    locations: LunchLocationMap;
}

export interface SetLunchStatusPayload {
    lunchId: string;
    lunchStatus: LunchStatus;
}

export interface AddLunchMemberPayload {
    lunchId: string;
    memberId: string;
    time: TimeSpan;
    location: Location;
}

export interface RemoveLunchMemberPayload {
    lunchId: string;
    memberId: string;
}

export interface SetLunchLocationPayload {
    lunchId: string;
    memberId: string;
    location: Location;
}

export interface SetLunchTimePayload {
    lunchId: string;
    memberId: string;
    time: TimeSpan;
}

export interface SetLunchChatPayload {
    lunchId: string;
    chat: Chat;
}

export interface AddChatMessagePayload {
    lunchId: string;
    message: Message;
}

export interface UpdateChatMessagePayload {
    lunchId: string;
    message: {
        messageId: string;
        status: MessageStatus;
    };
}

export interface RemoveChatMessagePayload {
    lunchId: string;
    message: {
        messageId: string;
    };
}

// --- Actions
export enum LunchActions {
    SET_LUNCHES = '@@lunches/set_lunches',
    CREATE_LUNCH = '@@lunches/create_lunch',
    UPDATE_LUNCH = '@@lunches/update_lunch',
    SET_LUNCH_STATUS = '@@lunches/set_lunch_status',
    REMOVE_LUNCH = '@@lunches/remove_lunch',
    ADD_LUNCH_MEMBER = '@@lunches/add_lunch_member',
    REMOVE_LUNCH_MEMBER = '@@lunches/remove_lunch_member',
    SET_LUNCH_LOCATION = '@@lunches/set_lunch_location',
    SET_LUNCH_TIME = '@@lunches/set_lunch_time',
    SET_LUNCH_CHAT = '@@lunches/set_chat',
    ADD_CHAT_MESSAGE = '@@lunches/add_chat_message',
    ADD_LOADED_CHAT_MESSAGES = '@@lunches/add_loaded_chat_messages',
    UPDATE_CHAT_MESSAGE = '@@lunches/UPDATE_CHAT_MESSAGE',
    REMOVE_CHAT_MESSAGE = '@@lunches/remove_chat_message',
    START_REQUEST = '@@lunches/start_request',
    REQUEST_SUCCESS = '@@lunches/request_success',
    REQUEST_FAIL = '@@lunches/request_fail',
    CLEAR_ERROR_MESSAGE = '@@lunches/clear_error_message'
}

export enum LunchSagaActions {
    GET_LUNCHES = '@@lunches/get_lunches',
    POST_LUNCH = '@@lunches/post_lunch',
    GET_LUNCH_CHAT = '@@lunches/get_lunch_chat',
    SEND_CHAT_MESSAGE = '@@lunches/send_chat_message'
}