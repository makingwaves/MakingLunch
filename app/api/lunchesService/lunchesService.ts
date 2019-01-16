import httpClient from './../../config/axios';

import { ErrorHandleService } from "../../services";

import { MembersMap } from '../../state/members/types';
import { LunchesMap } from "../../state/lunches/types";
import { BasicProfile } from './../../state/auth/types';
import { ErrorResponse } from '../../services/errorHandleService/errorHandleService';
import { mapAndExtendGuests, flattenGuestFn } from '../helpers/processedMember';
import { mapAndExtendLunches, mapId, mapStatus, mapLocations, mapTimes, mapMembers, mapChat } from '../helpers/processedLunch';

export interface LunchBasicResponse {
    id: string;
    begin: string;
    end: string;
    latitude: number;
    longitude: number;
}

export interface GuestResponseDto extends LunchBasicResponse {
    radiusInMeters: number;
    user: BasicProfile;
};

export interface LunchResponseDto extends LunchBasicResponse {
    guests: GuestResponseDto[];
};

class LunchesService extends ErrorHandleService {

    public getLunchesAndMembers(): Promise<(LunchesMap | MembersMap)[] | ErrorResponse> {
        return httpClient.get<LunchResponseDto[]>('/api/Lunches')
            .then(res => [this.mapLunchesResponse(res.data), this.mapMembersFromResponse(res.data)])
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to get Lunches.'))
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
}

const lunchesService = new LunchesService;

export default lunchesService;