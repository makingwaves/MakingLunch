import { createSelector } from "reselect";

import { AppState } from '@app/state/state';
import { LunchesMap, Lunch, LunchStatus } from '@app/state/lunches/types';

const getLunches = (state: AppState) => state.lunches.data;

const getLunchType = (lunches: LunchesMap, cb: (lunch: Lunch) => boolean): LunchesMap => {
    return lunches && Object.keys(lunches)
        .filter(key => cb(lunches[key]))
        .reduce((obj, key) =>
            (obj[key] = lunches[key], obj)
            , {});
}

const getRunningLunch = (lunches: LunchesMap): Lunch => {
    const lunchId = getRunningLunchId(lunches, lunch => lunch.status === LunchStatus.running);
    return (lunchId && lunches[lunchId]) && lunches[lunchId];
}

const getRunningLunchId = (lunches: LunchesMap, cb: (lunch: Lunch) => boolean): string => {
    return lunches && Object.keys(lunches)
        .find(key => cb(lunches[key]));
}

export const getPendingAndRunningLunches = createSelector(
    getLunches,
    lunches => ({
        pending: getLunchType(lunches, lunch => lunch.status === LunchStatus.pending),
        running: getRunningLunch(lunches)
    })
);