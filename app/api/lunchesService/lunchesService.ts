import httpClient from '@app/config/axios';

import { MembersMap } from '@app/state/members/types';
import { BasicProfile } from '@app/state/auth/types';
import { Location, TimeSpan } from '@app/state/lunches/types';
import { LunchesMap, CreateLunchPayload } from "@app/state/lunches/types";
import ErrorHandleService, { ErrorResponse } from '@app/services/errorHandleService/errorHandleService';
import { normalizePostedLunchRequest, normalizeLunchesRequest, normalizeMeetingsRequest, normalizeLunchRequest, normalizeLunchesAndMeetingsRequest } from '@app/sagas/lunchesSaga/normalizers';

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
    radiusInMeters: number;
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
            .then(res => normalizePostedLunchRequest(res.data))
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to add Lunch.'))
    }

    public getLunches(): Promise<LunchesResponse | ErrorResponse> {
        return Promise.all([
            this.getMeetings(),
            this.getLunchesAndMembers()
        ])
            .then(([meetings, lunches]: [LunchesResponse, LunchesResponse]) => normalizeLunchesAndMeetingsRequest(meetings, lunches))
            .catch((err: any) => this.getErrorMessage(err, err.message))
    }

    public getSingleLunch(lunchId: string): Promise<any> {
        return httpClient.get<LunchResponseDto>('/api/Lunches/' + lunchId)
            .then(res => normalizeLunchRequest(res.data))
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to get Single Lunch.'));
    }

    public deleteMeetingRequest(meetingId: string): Promise<object | ErrorResponse> {
        return httpClient.delete('/api/Meetings/' + meetingId)
            .then(res => res.data)
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to cancel lunch.'))
    }

    private getMeetings(): Promise<LunchesResponse | ErrorResponse> {
        return httpClient.get<MeetingsResponse[]>('/api/Meetings?onlyUnassigned=true')
            .then(res => normalizeMeetingsRequest(res.data))
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to get Lunches.'))
    }

    private getLunchesAndMembers(): Promise<LunchesResponse | ErrorResponse> {
        return httpClient.get<LunchResponseDto[]>('/api/Lunches')
            .then(res => normalizeLunchesRequest(res.data))
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to get Lunches.'))
    }
}

const lunchesService = new LunchesService;

export default lunchesService;