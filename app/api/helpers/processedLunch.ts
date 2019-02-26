import dayjs from 'dayjs';

import { MapperFn } from './utils';
import { LunchResponseDto, MeetingsResponse } from "@app/api/lunchesService/lunchesService";
import { LunchStatus, LunchLocationMap, LunchTimeMap, Chat, LunchesMap, Lunch } from "@app/state/lunches/types";

export type LunchesMapFn<T> = MapperFn<LunchResponseDto, T>;

export const stringToDayJS = (dateString?: string) => dateString && typeof dateString === 'string' ? dayjs(dateString) : dayjs();
export const getGivenKeysFromMeeting = <T>(item: MeetingsResponse, keys: (keyof MeetingsResponse)[]): T => (
    keys && keys
        .reduce((keysObject, key) => (keysObject[key] = item[key], keysObject), {})
) as T;
export const getDefaultLunchObject = <T extends object>(lunch: LunchResponseDto, keys: (keyof MeetingsResponse)[]): T => ({
    [lunch.id]: keys && keys
        .reduce((keysObject, key) => (keysObject[key] = lunch[key], keysObject), {})
} as T);
export const mapAndExtendLunches = (
    lunches: LunchResponseDto[],
    idMapFn: LunchesMapFn<string>,
    statusMapFn: LunchesMapFn<LunchStatus>,
    locationsMapFn: LunchesMapFn<LunchLocationMap>,
    timesMapFn: LunchesMapFn<LunchTimeMap>,
    membersMapFn: LunchesMapFn<string[]>,
    chatMapFn: LunchesMapFn<Chat>
): LunchesMap => {
    return lunches && lunches
        .map(lunch => ({
            id: idMapFn(lunch),
            status: statusMapFn(lunch),
            locations: locationsMapFn(lunch),
            times: timesMapFn(lunch),
            members: membersMapFn(lunch),
            chat: chatMapFn(lunch)
        }))
        .reduce((lunchMappedObject, lunch) => (
            lunchMappedObject[lunch.id] = lunch, lunchMappedObject
        ), {});
};
export const mapAndExtendLunch = (
    lunch: LunchResponseDto,
    idMapFn: LunchesMapFn<string>,
    statusMapFn: LunchesMapFn<LunchStatus>,
    locationsMapFn: LunchesMapFn<LunchLocationMap>,
    timesMapFn: LunchesMapFn<LunchTimeMap>,
    membersMapFn: LunchesMapFn<string[]>,
    chatMapFn: LunchesMapFn<Chat>
): Lunch => {
    return lunch && {
        id: idMapFn(lunch),
        status: statusMapFn(lunch),
        locations: locationsMapFn(lunch),
        times: timesMapFn(lunch),
        members: membersMapFn(lunch),
        chat: chatMapFn(lunch)
    }
};

export const mapId = (lunch: LunchResponseDto): string => {
    return lunch && lunch.id;
}
export const mapStatus = (lunch: LunchResponseDto): LunchStatus => {
    const [endDate, nowDate] = [
        stringToDayJS(lunch.end),
        stringToDayJS()
    ];

    if (nowDate.isAfter(endDate))
        return LunchStatus.finished;
    if (lunch.guests.length > 1)
        return LunchStatus.running;
    return LunchStatus.pending;
}
export const mapLocations = (lunch: LunchResponseDto): LunchLocationMap => {
    return lunch && lunch.guests
        .reduce((locationsObject, guest) => (
            locationsObject[guest.user.id] = getGivenKeysFromMeeting(guest, ['latitude', 'longitude', 'radiusInMeters']), locationsObject
        ), getDefaultLunchObject<LunchLocationMap>(lunch, ['longitude', 'latitude', 'radiusInMeters']));
}
export const mapTimes = (lunch: LunchResponseDto): LunchTimeMap => {
    return lunch && lunch.guests
        .reduce((timesObject, guest) => (
            timesObject[guest.user.id] = getGivenKeysFromMeeting(guest, ['begin', 'end']), timesObject
        ), getDefaultLunchObject<LunchTimeMap>(lunch, ['begin', 'end']));
};
export const mapMembers = (lunch: LunchResponseDto): string[] => {
    return lunch && lunch.guests
        .map(guest => guest.user.id);
}
export const mapChat = (lunch: LunchResponseDto): Chat => {
    return {};
}