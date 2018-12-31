import httpClient from './../../config/axios';

import { ErrorHandleService } from "../../services";

import { BasicProfile } from './../../state/auth/types';
import { LunchesMap } from "../../state/lunches/types";
import { ErrorResponse } from '../../services/errorHandleService/errorHandleService';
import { mapAndExtendLunches, mapId, mapStatus, mapLocations, mapTimes, mapMembers, mapChat } from './helpers/processedLunch';

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

    public getLunches(): Promise<LunchesMap | ErrorResponse> {
        return httpClient.get<LunchResponseDto[]>('/api/Lunches')
            .then(res => this.mapLunchesResponse(res.data))
            .catch(err => this.getErrorMessage(err, 'An error occured while trying to get Lunches.'))
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