import dayjs from 'dayjs';

import { MeetingsResponse, LunchResponseDto, LunchesResponse } from "@app/api/lunchesService/lunchesService";
import { CreateLunchPayload, TimeSpan, Location, LunchesMap, Lunch, LunchStatus, LunchLocationMap, LunchTimeMap } from "@app/state/lunches/types";
import { MembersMap } from '@app/state/members/types';

export const normalizePostedLunchRequest = (data: MeetingsResponse): CreateLunchPayload => {
    return {
        lunchId: data.id,
        creatorId: data.user.id,
        location: normalizeLocation(data.radiusInMeters, data.latitude, data.longitude),
        time: normalizeTime(data.begin, data.end)
    };
};

export const normalizeLunchesRequest = (data: LunchResponseDto[]): LunchesResponse => {
    return {
        lunches: normalizeLunches(data),
        members: normalizeMembers(data)
    }
};

export const normalizeMeetingsRequest = (data: MeetingsResponse[]): LunchesResponse => {
    return {
        lunches: normalizeMeetings(filterOutPendingPastMeetings(data)),
        members: {}
    }
};

export const normalizeLunchRequest = (data: LunchResponseDto): LunchesResponse => {
    return {
        lunches: normalizeLunches([data]),
        members: normalizeMembers([data])
    };
};

export const normalizeLunchesAndMeetingsRequest = (meetings: LunchesResponse, lunches: LunchesResponse): LunchesResponse => {
    return {
        lunches: { ...meetings.lunches, ...lunches.lunches },
        members: { ...meetings.members, ...lunches.members }
    };
};

const normalizeMembers = (data: LunchResponseDto[]): MembersMap => {
    return flattenGuestFn(data)
        .map(m => m.user)
        .reduce((membersObject, m) => (
            membersObject[m.id] = m, membersObject
        ), {});
}

const flattenGuestFn = (lunches: LunchResponseDto[]): MeetingsResponse[] => {
    return lunches && lunches
        .map(lunch => lunch.guests)
        .reduce((flattenArray, guestArray) => flattenArray.concat(guestArray), []);
}

const filterOutPendingPastMeetings = (data: MeetingsResponse[]): MeetingsResponse[] => {
    return data && data
        .filter(r =>
            dayjs(r.end).isAfter(dayjs())
        );
};

const normalizeLunches = (data: LunchResponseDto[]): LunchesMap => {
    return data
        .map(d => normalizeLunch(d))
        .reduce((lunchesObject, d) => (
            lunchesObject[d.id] = d, lunchesObject
        ), {});
};

const normalizeMeetings = (data: MeetingsResponse[]): LunchesMap => {
    return data
        .map(d => normalizeMeeting(d))
        .reduce((meetingsObject, d) => (
            meetingsObject[d.id] = d, meetingsObject
        ), {});
};

const normalizeMeeting = (data: MeetingsResponse): Lunch => {
    return {
        id: data.id,
        status: LunchStatus.pending,
        locations: { [data.id]: normalizeLocation(data.radiusInMeters, data.latitude, data.longitude) },
        times: { [data.id]: normalizeTime(data.begin, data.end) },
        members: [data.user.id],
        chat: {},
        isCancelling: false
    }
};

const normalizeLunch = (data: LunchResponseDto): Lunch => {
    return {
        id: data.id,
        status: normalizeStatus(data),
        locations: normalizeGuestLocations(data),
        times: normalizeGuestTimes(data),
        members: normalizeGuests(data),
        chat: {},
        isCancelling: false
    };
};

const normalizeGuests = (lunch: LunchResponseDto): string[] => {
    return lunch && lunch.guests
        .map(guest => guest.user.id);
};

const normalizeGuestLocations = (lunch: LunchResponseDto): LunchLocationMap => {
    return lunch.guests
        .reduce((locationObject, g) => (
            locationObject[g.user.id] = normalizeLocation(g.radiusInMeters, g.latitude, g.longitude), locationObject
        ), { [lunch.id]: normalizeLocation(lunch.radiusInMeters, lunch.latitude, lunch.longitude) })
};

const normalizeGuestTimes = (lunch: LunchResponseDto): LunchTimeMap => {
    return lunch.guests
        .reduce((timeObject, g) => (
            timeObject[g.user.id] = normalizeTime(g.begin, g.end), timeObject
        ), { [lunch.id]: normalizeTime(lunch.begin, lunch.end) });
};

const normalizeStatus = (lunch: LunchResponseDto): LunchStatus => {
    const [endDate, nowDate] = [
        stringToDayJS(lunch.end),
        stringToDayJS()
    ];

    if (nowDate.isAfter(endDate))
        return LunchStatus.finished;
    if (lunch.guests.length > 1)
        return LunchStatus.running;
    return LunchStatus.pending;
};

const normalizeLocation = (radiusInMeters: number, latitude: number, longitude: number): Location => {
    return {
        radiusInMeters,
        latitude,
        longitude
    };
};

const normalizeTime = (begin: string, end: string): TimeSpan => {
    return {
        begin,
        end
    };
};

const stringToDayJS = (dateString?: string) => {
    return dateString && typeof dateString === 'string' ? dayjs(dateString) : dayjs();
};