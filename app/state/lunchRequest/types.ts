export interface Location {
    latitude: number;
    longitude: number;
}

export interface Time {
    start: string;
    end: string
}

export interface LunchRequestState  {
    location: Location;
    time: Time;
    range: number;
}

export enum ActionTypes {
    SET_RADIUS = '@@lunchRequest/set_radius',
    SET_LOCATION = '@@lunchRequest/set_location',
    SET_TIME = '@@lunchRequest/set_time'
}

