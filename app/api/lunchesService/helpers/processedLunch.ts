import dayjs from 'dayjs';

import { LunchResponseDto, GuestResponseDto } from "../lunchesService";
import { LunchStatus, LunchLocationMap, LunchTimeMap, Chat, LunchesMap } from "../../../state/lunches/types";

export type LunchesMapFn<T> = (lunch: LunchResponseDto) => T;

export const stringToDayJS = (dateString?: string) => dateString && typeof dateString === 'string' ? dayjs(dateString) : dayjs();
export const getGivenKeysFromGuest = (guest: GuestResponseDto, keys: (keyof GuestResponseDto)[]) => (
    keys && keys
        .reduce((keysObject, key) => (keysObject[key] = guest[key], keysObject), {})
);
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
}

// mappers
export const mapId = (lunch: LunchResponseDto): string => {
    return lunch && lunch.id;
}
export const mapStatus = (lunch: LunchResponseDto): LunchStatus => {
    const [endDate, nowDate] = [
        stringToDayJS(lunch.end),
        stringToDayJS()
    ];
    
    if(nowDate.isAfter(endDate))
        return LunchStatus.finished;
    if(lunch.guests.length > 1)
        return LunchStatus.running;
    return LunchStatus.pending;
}
export const mapLocations = (lunch: LunchResponseDto): LunchLocationMap => {
    return lunch && lunch.guests
        .reduce((locationsObject, guest) => (locationsObject[guest.user.id] = getGivenKeysFromGuest(guest, ['latitude', 'longitude', 'radiusInMeters']), locationsObject), {});
}
export const mapTimes = (lunch: LunchResponseDto): LunchTimeMap => {
    return lunch && lunch.guests
        .reduce((timesObject, guest) => (timesObject[guest.user.id] = getGivenKeysFromGuest(guest, ['begin', 'end']), timesObject) , {});
};
export const mapMembers = (lunch: LunchResponseDto): string[] => {
    return lunch && lunch.guests
        .map(guest => guest.user.id);
}
export const mapChat = (lunch: LunchResponseDto): Chat => {
    return {};
}

