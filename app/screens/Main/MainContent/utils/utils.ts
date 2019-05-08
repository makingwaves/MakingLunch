import dayjs from 'dayjs';

import { TimeSpan, LunchesMap } from "@app/state/lunches/types";

export const isBetweenOtherPendingLunches = (lunchTimeSpan: TimeSpan, pending: LunchesMap, userId: string): boolean => {
    return pending && Object.keys(pending)
        .some(id =>
            timesCollide(pending[id].times[userId], lunchTimeSpan.begin, lunchTimeSpan.end)
            ||
            timesCollide(lunchTimeSpan, pending[id].times[userId].begin, pending[id].times[userId].end)
        );
}

export const timesCollide = (lunchTime: TimeSpan, begin: string, end: string): boolean => {
    if (isBetween(dayjs(begin), dayjs(lunchTime.begin), dayjs(lunchTime.end)))
        return true;
    if (isBetween(dayjs(end), dayjs(lunchTime.begin), dayjs(lunchTime.end)))
        return true;
    return false;
}

export const isBetween = (checkingTime: dayjs.Dayjs, begin: dayjs.Dayjs, end: dayjs.Dayjs): boolean => {
    if (checkingTime.isSame(begin) || checkingTime.isSame(end))
        return true;
    if (checkingTime.isAfter(begin) && checkingTime.isBefore(end))
        return true;
    return false;
}