import { createSelector } from 'reselect';

import { AppState } from '../../state/state';
import { LunchesListDto } from './LunchesList';
import { LunchesMap, LunchStatus, Lunch } from '../../state/lunches/types';

const getLunches = (state: AppState) => state.lunches.data;

const splitLunchesByStatus = (lunches: LunchesMap): LunchesListDto[] => {
    return lunches && Object.keys(lunches)
        .reduce((statusArray, lunchId) => {
            const lunch = lunches[lunchId];
            return statusArray.map(statusType => {
                if(statusType.title === lunch.status)
                    return { title: statusType.title, data: (statusType.data.push(lunch), statusType.data) };
                return statusType;
            });
        }, getDefaultStatusObject())
        .map(statusObject => ({ title: statusObject.title, data: sortLunchesDataByDate(statusObject.data) }))
};

const getDefaultStatusObject = (): LunchesListDto[] => {
    return [
        { title: LunchStatus.pending, data: [] },
        { title: LunchStatus.running, data: [] },
        { title: LunchStatus.finished, data: [] }
    ]
};

const sortLunchesDataByDate = (lunchesData: Lunch[]): Lunch[] => {
    return lunchesData && lunchesData
        .sort((a, b) => {
            const [aTime, bTime] = [
                getTimes(a), getTimes(b)
            ];
            return aTime > bTime ? -1 : aTime < bTime ? 1 : 0
        });
};

const getTimes = (lunch: Lunch): string => {
    return lunch.times[lunch.id].begin;
}

export const mapLunchesToArray = createSelector(
    getLunches,
    lunches => splitLunchesByStatus(lunches)
);
