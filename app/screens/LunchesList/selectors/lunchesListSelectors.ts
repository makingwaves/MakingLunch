import { createSelector } from 'reselect';

import { AppState } from '@app/state/state';
import { LunchesListDto } from '../LunchesList';
import { LunchesMap, LunchStatus, Lunch } from '@app/state/lunches/types';

const getUserId = (state: AppState) => state.auth.profile.id;
const getLunches = (state: AppState) => state.lunches.data;

const splitLunchesByStatus = (lunches: LunchesMap, userId: string): LunchesListDto[] => {
    return lunches && Object.keys(lunches)
        .reduce((statusArray, lunchId) => {
            const lunch = lunches[lunchId];
            return statusArray.map(statusType => {
                if (statusType.title === lunch.status)
                    return { title: statusType.title, data: (statusType.data.push(lunch), statusType.data) };
                return statusType;
            });
        }, getDefaultStatusObject())
        .map(statusObject => ({ title: statusObject.title, data: sortLunchesDataByDate(statusObject.data, userId) }))
};

const getDefaultStatusObject = (): LunchesListDto[] => {
    return [
        { title: LunchStatus.pending, data: [] },
        { title: LunchStatus.running, data: [] },
        { title: LunchStatus.finished, data: [] }
    ]
};

const sortLunchesDataByDate = (lunchesData: Lunch[], userId: string): Lunch[] => {
    return lunchesData && lunchesData
        .sort((a, b) => {
            const [aTime, bTime] = [
                getTimes(a, userId), getTimes(b, userId)
            ];
            return aTime > bTime ? -1 : aTime < bTime ? 1 : 0
        });
};

const getTimes = (lunch: Lunch, userId: string): string => {
    if (lunch.times[lunch.id] && lunch.times[lunch.id].begin)
        return lunch.times[lunch.id].begin;
    return lunch.times[userId].begin
}

export const mapLunchesToArray = createSelector(
    getLunches,
    getUserId,
    (lunches, userId) => splitLunchesByStatus(lunches, userId)
);
