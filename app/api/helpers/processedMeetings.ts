import dayjs from 'dayjs';

import { MapperFn } from './utils';
import { MeetingsResponse } from "@app/api/lunchesService/lunchesService";
import { Location, CreateLunchPayload, TimeSpan, LunchStatus, LunchLocationMap, LunchTimeMap, Chat, LunchesMap } from "@app/state/lunches/types";

export type MeetingMapFn<T> = MapperFn<MeetingsResponse, T>;

export const getGivenKeysFromMeeting = <T>(item: MeetingsResponse, keys: (keyof MeetingsResponse)[]): T => (
    keys && keys
        .reduce((keysObject, key) => (keysObject[key] = item[key], keysObject), {})
) as T;

export const mapAndExtendAddedMeeting = (
    meeting: MeetingsResponse,
    mapLunchIdFn: MeetingMapFn<string>,
    mapCreatorIdFn: MeetingMapFn<string>,
    mapLocationFn: MeetingMapFn<Location>,
    mapTimeFn: MeetingMapFn<TimeSpan>
): CreateLunchPayload => {
    return {
        lunchId: mapLunchIdFn(meeting),
        creatorId: mapCreatorIdFn(meeting),
        location: mapLocationFn(meeting),
        time: mapTimeFn(meeting)
    };
};

export const mapAndExtendMeetings = (
    meetings: MeetingsResponse[],
    idMapFn: MeetingMapFn<string>,
    statusMapFn: MeetingMapFn<LunchStatus>,
    locationsMapFn: MeetingMapFn<LunchLocationMap>,
    timesMapFn: MeetingMapFn<LunchTimeMap>,
    membersMapFn: MeetingMapFn<string[]>,
    chatMapFn: MeetingMapFn<Chat>
): LunchesMap => {
    return meetings && meetings
        .map(meeting => ({
            id: idMapFn(meeting),
            status: statusMapFn(meeting),
            locations: locationsMapFn(meeting),
            times: timesMapFn(meeting),
            members: membersMapFn(meeting),
            chat: chatMapFn(meeting)
        }))
        .reduce((lunchMappedObject, lunch) => (
            lunchMappedObject[lunch.id] = lunch, lunchMappedObject
        ), {});
}

// mappers
export const mapMeetingId = (meeting: MeetingsResponse): string => {
    return meeting && meeting.id;
}
export const mapMeetingCreatorId = (meeting: MeetingsResponse): string => {
    return meeting && meeting.user.id;
};
export const mapMeetingLocation = (meeting: MeetingsResponse): Location => {
    return meeting && getGivenKeysFromMeeting(meeting, ['latitude', 'longitude', 'radiusInMeters']);
};
export const mapMeetingTime = (meeting: MeetingsResponse): TimeSpan => {
    return meeting && getGivenKeysFromMeeting(meeting, ['begin', 'end']);
};
export const mapMeetingStatus = (meeting: MeetingsResponse): LunchStatus => {
    return LunchStatus.pending;
};
export const mapMeetingMembers = (meeting: MeetingsResponse): string[] => {
    return meeting && [meeting.user.id];
};
export const mapMeetingChat = (meeting: MeetingsResponse): Chat => {
    return {};
};
export const mapMeetingLocations = (meeting: MeetingsResponse): LunchLocationMap => {
    return meeting && {
        [meeting.user.id]: mapMeetingLocation(meeting)
    }
};
export const mapMeetingTimes = (meeting: MeetingsResponse): LunchTimeMap => {
    return meeting && {
        [meeting.user.id]: mapMeetingTime(meeting)
    }
}
