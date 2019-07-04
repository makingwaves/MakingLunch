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

interface MeetingResponseDto extends LunchBasicResponseDto {
    radiusInMeters: number;
    user: AccountDataResponseDto;
}

interface LunchResponseDto extends LunchBasicResponseDto {
    guests: MeetingResponseDto[];
}

export interface LunchDto extends LunchBasicResponseDto {
    lunchRequests: MeetingResponseDto[]
}

function mapMeetingToCorrectLunch(meetingResponseDto: MeetingResponseDto): LunchDto {
    return ({
        id: meetingResponseDto.id,
        status: LunchStatus.pending,
        begin: meetingResponseDto.begin,
        end: meetingResponseDto.end,
        latitude: meetingResponseDto.latitude,
        longitude: meetingResponseDto.longitude,
        lunchRequests: [meetingResponseDto]
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
        lunchRequests: lunchesResponseDto.guests
    })
}



class LunchesService extends ErrorHandleService {
    public sendRequestLunch = (location: Location, timeSpan: TimeSpan): Promise<LunchDto| ErrorResponse> => {
        return api.post<MeetingResponseDto>('/api/Meetings/')
            .then(response => response.data)
            .then(mapMeetingToCorrectLunch)
            .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to send lunch request.'));
    };
    public cancelRequestLunch = (lunchId: string): Promise<void| ErrorResponse> => {
        return api.delete('/api/Meetings/' + lunchId).then(response => response.data)
                  .catch(err => this.getErrorMessage(err, 'An Error occurred while trying to cancel lunch.'));

    };
    public getAllLunches = (): Promise<LunchDto[]| ErrorResponse> => {
         return Promise.all<AxiosResponse<MeetingResponseDto[]>, AxiosResponse<LunchResponseDto[]>>([
            api.get('/api/Meetings?onlyUnassigned=true'),
            api.get('/api/Lunches'),
        ]).then(([meetingsResponse, lunchesResponse])=> {

            const requestsOfLunches:LunchDto[] = meetingsResponse.data.map(mapMeetingToCorrectLunch);
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