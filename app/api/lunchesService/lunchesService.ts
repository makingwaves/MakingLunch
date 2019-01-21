import httpClient from './../../config/axios';

import { ErrorHandleService } from "../../services";

import { MembersMap } from '../../state/members/types';
import { LunchesMap, CreateLunchPayload } from "../../state/lunches/types";
import { BasicProfile } from './../../state/auth/types';
import { ErrorResponse } from '../../services/errorHandleService/errorHandleService';
import { mapAndExtendGuests, flattenGuestFn } from '../helpers/processedMember';
import * as mappers from '../helpers/processedLunch';
import { Location, TimeSpan } from './../../state/lunches/types';

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

export interface MeetingRequest extends Location, TimeSpan {};

class LunchesService extends ErrorHandleService {
    public postLunch(payload: MeetingRequest): Promise<CreateLunchPayload | ErrorResponse> {
        return httpClient.post<MeetingsResponse>('/api/Meetings', payload)
            .then(res => this.mapMeetingResponse(res.data))
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to add Lunch.'))
    }

    public getLunchesAndMembers(): Promise<(LunchesMap | MembersMap)[] | ErrorResponse> {
        return httpClient.get<LunchResponseDto[]>('/api/Lunches')
            .then(res => [this.mapLunchesResponse(res.data), this.mapMembersFromResponse(res.data)])
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to get Lunches.'))
    } 

    private mapMeetingResponse(res: MeetingsResponse): CreateLunchPayload {
        return mappers.mapAndExtendMeeting(res,
            meeting => mappers.mapMeetingId(meeting),
            meeting => mappers.mapMeetingCreatorId(meeting),
            meeting => mappers.mapMeetingLocation(meeting),
            meeting => mappers.mapMeetingTime(meeting)
        );
    }

    private mapMembersFromResponse(res: LunchResponseDto[]): MembersMap {
        return mapAndExtendGuests(res, 
            lunches => flattenGuestFn(lunches)
        );
    }

    private mapLunchesResponse(res: LunchResponseDto[]): LunchesMap {
        return mappers.mapAndExtendLunches(res, 
            lunch => mappers.mapId(lunch), 
            lunch => mappers.mapStatus(lunch), 
            lunch => mappers.mapLocations(lunch),
            lunch => mappers.mapTimes(lunch), 
            lunch => mappers.mapMembers(lunch), 
            lunch => mappers.mapChat(lunch)
        );
    }
}

const lunchesService = new LunchesService;

export default lunchesService;