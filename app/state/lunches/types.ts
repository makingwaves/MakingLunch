import { Request } from '../common/types';

// --- State interfaces:

export enum LunchStatus {
    pending = 'PENDING',
    running = 'RUNNING',
    finished = 'FINISHED'
}

export interface Location {
    latitude: number;
    longitude: number;
    radiusInMeters: number;
}

export interface TimeSpan {
    begin: string;
    end: string;
}

export interface LunchTimeMap {
    [memberId: string]: TimeSpan;
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
}

export interface LunchesMap {
    [lunchId: string]: Lunch;
}

export interface LunchesState {
    request: Request;
    data: LunchesMap;
}

// --- Actions
export enum LunchesActions {
    SET_LUNCHES_REQUEST_STATUS = 'LUNCHES/SET_LUNCHES_REQUEST_STATUS',
    SET_LUNCHES = 'LUNCHES/SET_LUNCHES',
    CREATE_LUNCH = 'LUNCHES/CREATE_LUNCH',
    ADD_LUNCH = 'LUNCHES/ADD_LUNCH',
    REMOVE_LUNCH = 'LUNCHES/REMOVE_LUNCH',

    ADD_LUNCH_MEMBER = 'LUNCHES/ADD_LUNCH_MEMBER',
    REMOVE_LUNCH_MEMBER = 'LUNCHES/REMOVE_LUNCH_MEMBER',
}
