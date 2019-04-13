import dayjs from 'dayjs';

import httpClient from '@app/config/axios';

import { MembersMap } from '@app/state/members/types';
import { BasicProfile } from '@app/state/auth/types';
import { Location, TimeSpan, Lunch } from '@app/state/lunches/types';
import { LunchesMap, CreateLunchPayload } from "@app/state/lunches/types";
import ErrorHandleService, { ErrorResponse } from '@app/services/errorHandleService/errorHandleService';
import { mapAndExtendGuests, flattenGuestFn } from '@app/api/helpers/processedMember';
import { mapAndExtendLunches, mapStatus, mapId, mapLocations, mapTimes, mapMembers, mapChat, mapAndExtendLunch } from '../helpers/processedLunch';
import {
    mapAndExtendAddedMeeting, mapAndExtendMeetings, mapMeetingId, mapMeetingTimes, mapMeetingChat, mapMeetingLocations, mapMeetingCreatorId,
    mapMeetingTime, mapMeetingStatus, mapMeetingLocation, mapMeetingMembers
} from '../helpers/processedMeetings';

export interface LunchBasicResponse {
    id: string;
    begin: string;
    end: string;
    latitude: number;
    longitude: number;
}

export interface MeetingsResponse extends LunchBasicResponse {
    radiusInMeters: number;
    user: BasicProfile;
};

export interface LunchResponseDto extends LunchBasicResponse {
    guests: MeetingsResponse[];
};

export interface MeetingRequest extends Location, TimeSpan { };

export interface LunchesResponse {
    lunches: LunchesMap;
    members: MembersMap;
};

class LunchesService extends ErrorHandleService {
    public postLunch(payload: MeetingRequest): Promise<CreateLunchPayload | ErrorResponse> {
        return httpClient.post<MeetingsResponse>('/api/Meetings', payload)
            .then(res => this.mapPostedMeetingResponse(res.data))
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to add Lunch.'))
    }

    public getLunches(): Promise<LunchesResponse | ErrorResponse> {
        return Promise.all([
            this.getMeetings(),
            this.getLunchesAndMembers()
        ])
            .then((res: any) => ({
                lunches: { ...res[0].lunches, ...res[1].lunches },
                members: { ...res[0].members, ...res[1].members }
            }))
            .catch((err: any) => this.getErrorMessage(err, err.message))
    }

    public getSingleLunch(lunchId: string): Promise<Lunch | ErrorResponse> {
        return httpClient.get<LunchResponseDto>('/api/Lunches/' + lunchId)
            .then(res => this.mapSingleLunchResponse(res.data))
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to get Single Lunch.'));
    }

    public deleteMeetingRequest(meetingId: string): Promise<object | ErrorResponse> {
        return httpClient.delete('/api/Meetings/' + meetingId)
            .then(res => res.data)
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to cancel lunch.'))
    }

    private getMeetings(): Promise<LunchesResponse | ErrorResponse> {
        return httpClient.get<MeetingsResponse[]>('/api/Meetings?onlyUnassigned=true')
            .then(res => this.filterOutPendingPastLunches(res.data))
            .then(res => ({ lunches: this.mapMeetingsResponse(res), members: {} }))
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to get Lunches.'))
    }

    private getLunchesAndMembers(): Promise<LunchesResponse | ErrorResponse> {
        return httpClient.get<LunchResponseDto[]>('/api/Lunches')
            .then(res => ({ lunches: this.mapLunchesResponse(res.data), members: this.mapMembersFromResponse(res.data) }))
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to get Lunches.'))
    }

    private mapPostedMeetingResponse(res: MeetingsResponse): CreateLunchPayload {
        return mapAndExtendAddedMeeting(res,
            meeting => mapMeetingId(meeting),
            meeting => mapMeetingCreatorId(meeting),
            meeting => mapMeetingLocation(meeting),
            meeting => mapMeetingTime(meeting)
        );
    }

    private mapMeetingsResponse(res: MeetingsResponse[]): LunchesMap {
        return mapAndExtendMeetings(res,
            meeting => mapMeetingId(meeting),
            meeting => mapMeetingStatus(meeting),
            meeting => mapMeetingLocations(meeting),
            meeting => mapMeetingTimes(meeting),
            meeting => mapMeetingMembers(meeting),
            meeting => mapMeetingChat(meeting)
        );
    }

    private filterOutPendingPastLunches(res: MeetingsResponse[]): MeetingsResponse[] {
        return res && res
            .filter(r =>
                dayjs(r.end).isAfter(dayjs())
            );
    }

    private mapMembersFromResponse(res: LunchResponseDto[]): MembersMap {
        return mapAndExtendGuests(res,
            lunches => flattenGuestFn(lunches)
        );
    }

    private mapLunchesResponse(res: LunchResponseDto[]): LunchesMap {
        return mapAndExtendLunches(res,
            lunch => mapId(lunch),
            lunch => mapStatus(lunch),
            lunch => mapLocations(lunch),
            lunch => mapTimes(lunch),
            lunch => mapMembers(lunch),
            lunch => mapChat(lunch)
        );
    }

    private mapSingleLunchResponse(res: LunchResponseDto): Lunch {
        return mapAndExtendLunch(res,
            lunch => mapId(lunch),
            lunch => mapStatus(lunch),
            lunch => mapLocations(lunch),
            lunch => mapTimes(lunch),
            lunch => mapMembers(lunch),
            lunch => mapChat(lunch)
        );
    }
}

const lunchesService = new LunchesService;

export default lunchesService;