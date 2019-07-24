import api from '@app/config/axios';
import {AxiosResponse} from "axios";

import ErrorHandleService, { ErrorResponse } from '@app/services/errorHandleService/errorHandleService';
import { AccountDataResponseDto} from "@app/api/accountService/accountService";
import {Location, LunchStatus, TimeSpan} from '@app/state/lunches/types';

interface LunchBasicResponseDto {
    id: string;
    status: LunchStatus,
    begin: string;
    end: string;
    latitude: number;
    longitude: number;
}

interface LunchProposalResponseDto extends LunchBasicResponseDto {
    radiusInMeters: number;
    user: AccountDataResponseDto;
}

interface LunchResponseDto extends LunchBasicResponseDto {
    guests: LunchProposalResponseDto[];
}

export interface LunchDto extends LunchBasicResponseDto {
    lunchProposals: LunchProposalResponseDto[]
}

function mapLunchProposalToCorrectLunch(meetingResponseDto: LunchProposalResponseDto): LunchDto {
    return ({
        id: meetingResponseDto.id,
        status: LunchStatus.pending,
        begin: meetingResponseDto.begin,
        end: meetingResponseDto.end,
        latitude: meetingResponseDto.latitude,
        longitude: meetingResponseDto.longitude,
        lunchProposals: [meetingResponseDto]
    })
}

function mapLunchToCorrectLunch(lunchesResponseDto: LunchResponseDto): LunchDto {
    return ({
        id: lunchesResponseDto.id,
        status: LunchStatus.running,
        begin: lunchesResponseDto.begin,
        end: lunchesResponseDto.end,
        latitude: lunchesResponseDto.latitude,
        longitude: lunchesResponseDto.longitude,
        lunchProposals: lunchesResponseDto.guests
    })
}



class LunchesService extends ErrorHandleService {
    public sendRequestLunch = (location: Location, timeSpan: TimeSpan): Promise<LunchDto| ErrorResponse> => {
        return api.post<LunchProposalResponseDto>('/api/LunchProposals/', {...location, ...timeSpan})
            .then(response => response.data)
            .then(mapLunchProposalToCorrectLunch)
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to send lunch request.'));
    };
    public cancelRequestLunch = (lunchId: string): Promise<void| ErrorResponse> => {
        return api.delete('/api/LunchProposals/' + lunchId).then(response => response.data)
                  .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to cancel lunch.'));

    };
    public getAllLunches = (): Promise<LunchDto[]| ErrorResponse> => {
         return Promise.all<AxiosResponse<LunchProposalResponseDto[]>, AxiosResponse<LunchResponseDto[]>>([
            api.get('/api/LunchProposals?onlyUnassigned=true'),
            api.get('/api/Lunches'),
        ]).then(([meetingsResponse, lunchesResponse])=> {

            const requestsOfLunches:LunchDto[] = meetingsResponse.data.map(mapLunchProposalToCorrectLunch);
            const drwanLunches:LunchDto[] = lunchesResponse.data.map( mapLunchToCorrectLunch);

            return [...requestsOfLunches, ...drwanLunches];
        }).catch(err => this.getErrorMessage(err, 'An Error occurred while trying to get all lunches.'));
    };

    public getLunch = (lunchId: string): Promise<LunchDto| ErrorResponse>  => {
        return api.get<LunchResponseDto>('/api/Lunches/' + lunchId)
            .then(response => response.data)
            .then(mapLunchToCorrectLunch)
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to get lunch.'));
    };
}

const lunchesService = new LunchesService;

export default lunchesService;
