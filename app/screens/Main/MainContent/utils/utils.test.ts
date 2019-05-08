import dayjs from 'dayjs';

import { isBetween, timesCollide, isBetweenOtherPendingLunches } from "./utils";
import { LunchesMap, LunchStatus, TimeSpan } from '@app/state/lunches/types';

describe('Utils', () => {

    describe('isBetween Function', () => {
        const lunchEnd = dayjs('Tue Mar 12 2019 12:04:15 GMT+0100');
        const lunchBegin = dayjs('Tue Mar 12 2019 10:04:15 GMT+0100');

        it('should return true, when given time is between lunch time', () => {
            const checkingTime1 = dayjs('Tue Mar 12 2019 10:04:16 GMT+0100');
            const checkingTime2 = dayjs('Tue Mar 12 2019 12:04:14 GMT+0100');
            const checkingTime3 = dayjs('Tue Mar 12 2019 11:11:11 GMT+0100');

            expect(
                isBetween(checkingTime1, lunchBegin, lunchEnd)
            ).toBeTruthy();

            expect(
                isBetween(checkingTime2, lunchBegin, lunchEnd)
            ).toBeTruthy();

            expect(
                isBetween(checkingTime3, lunchBegin, lunchEnd)
            ).toBeTruthy();
        });

        it('should return false, when given time is not between lunch time', () => {
            const checkingTime1 = dayjs('Tue Mar 12 2019 10:04:14 GMT+0100');
            const checkingTime2 = dayjs('Tue Mar 12 2019 12:04:16 GMT+0100');
            const checkingTime3 = dayjs('Tue Mar 12 2019 20:00:00 GMT+0100');

            expect(
                isBetween(checkingTime1, lunchBegin, lunchEnd)
            ).toBeFalsy();

            expect(
                isBetween(checkingTime2, lunchBegin, lunchEnd)
            ).toBeFalsy();

            expect(
                isBetween(checkingTime3, lunchBegin, lunchEnd)
            ).toBeFalsy();
        });
    });

    describe('timesCollide Function', () => {
        const lunchTime = {
            begin: 'Tue Mar 12 2019 10:04:15 GMT+0100',
            end: 'Tue Mar 12 2019 12:04:15 GMT+0100'
        };

        it('should return true, when given time collides', () => {
            const begin1 = 'Tue Mar 12 2019 10:00:15 GMT+0100';
            const end1 = 'Tue Mar 12 2019 10:04:15 GMT+0100';

            const begin2 = 'Tue Mar 12 2019 12:04:15 GMT+0100';
            const end2 = 'Tue Mar 12 2019 14:02:11 GMT+0100';

            const begin3 = 'Tue Mar 12 2019 11:04:11 GMT+0100';
            const end3 = 'Tue Mar 12 2019 12:01:11 GMT+0100';

            expect(
                timesCollide(lunchTime, begin1, end1)
            ).toBeTruthy();

            expect(
                timesCollide(lunchTime, begin2, end2)
            ).toBeTruthy();

            expect(
                timesCollide(lunchTime, begin3, end3)
            ).toBeTruthy();
        });

        it('should return false, when given time does not collide', () => {
            const begin1 = 'Tue Mar 12 2019 10:00:15 GMT+0100';
            const end1 = 'Tue Mar 12 2019 10:04:14 GMT+0100';

            const begin2 = 'Tue Mar 12 2019 12:04:16 GMT+0100';
            const end2 = 'Tue Mar 12 2019 14:02:11 GMT+0100';

            const begin3 = 'Tue Mar 12 2019 20:04:11 GMT+0100';
            const end3 = 'Tue Mar 12 2019 22:01:11 GMT+0100';

            expect(
                timesCollide(lunchTime, begin1, end1)
            ).toBeFalsy();

            expect(
                timesCollide(lunchTime, begin2, end2)
            ).toBeFalsy();

            expect(
                timesCollide(lunchTime, begin3, end3)
            ).toBeFalsy();
        });
    });

    describe('isBetweenOtherPendingLunches Function', () => {
        const userId: string = 'userId123';
        const pendingLunches: LunchesMap = {
            '1': {
                id: '1',
                status: LunchStatus.pending,
                locations: {},
                chat: {},
                isCancelling: false,
                members: [],
                times: {
                    [userId]: {
                        begin: 'Tue Mar 12 2019 10:00:15 GMT+0100',
                        end: 'Tue Mar 12 2019 10:04:14 GMT+0100'
                    }
                }
            },
            '2': {
                id: '2',
                status: LunchStatus.pending,
                locations: {},
                chat: {},
                isCancelling: false,
                members: [],
                times: {
                    [userId]: {
                        begin: 'Tue Mar 12 2019 12:00:15 GMT+0100',
                        end: 'Tue Mar 12 2019 14:04:14 GMT+0100'
                    }
                }
            },
            '3': {
                id: '3',
                status: LunchStatus.pending,
                locations: {},
                chat: {},
                isCancelling: false,
                members: [],
                times: {
                    [userId]: {
                        begin: 'Tue Mar 12 2019 15:00:15 GMT+0100',
                        end: 'Tue Mar 12 2019 16:04:14 GMT+0100'
                    }
                }
            }
        }

        it('should return true, when given timeSpan collides', () => {
            const timeSpan1: TimeSpan = {
                begin: 'Tue Mar 12 2019 10:01:15 GMT+0100',
                end: 'Tue Mar 12 2019 12:14:12 GMT+0100'
            };
            const timeSpan2: TimeSpan = {
                begin: 'Tue Mar 12 2019 14:01:15 GMT+0100',
                end: 'Tue Mar 12 2019 14:59:11 GMT+0100'
            };
            const timeSpan3: TimeSpan = {
                begin: 'Tue Mar 12 2019 16:01:15 GMT+0100',
                end: 'Tue Mar 12 2019 16:03:11 GMT+0100'
            };

            expect(
                isBetweenOtherPendingLunches(timeSpan1, pendingLunches, userId)
            ).toBeTruthy();
            expect(
                isBetweenOtherPendingLunches(timeSpan2, pendingLunches, userId)
            ).toBeTruthy();
            expect(
                isBetweenOtherPendingLunches(timeSpan3, pendingLunches, userId)
            ).toBeTruthy();
        });

        it('should return false, when given timeSpan does not collide', () => {
            const timeSpan1: TimeSpan = {
                begin: 'Tue Mar 12 2019 8:01:15 GMT+0100',
                end: 'Tue Mar 12 2019 10:00:12 GMT+0100'
            };
            const timeSpan2: TimeSpan = {
                begin: 'Tue Mar 12 2019 11:21:15 GMT+0100',
                end: 'Tue Mar 12 2019 11:59:11 GMT+0100'
            };
            const timeSpan3: TimeSpan = {
                begin: 'Tue Mar 12 2019 14:05:00 GMT+0100',
                end: 'Tue Mar 12 2019 15:00:00 GMT+0100'
            };

            expect(
                isBetweenOtherPendingLunches(timeSpan1, pendingLunches, userId)
            ).toBeFalsy();
            expect(
                isBetweenOtherPendingLunches(timeSpan2, pendingLunches, userId)
            ).toBeFalsy();
            expect(
                isBetweenOtherPendingLunches(timeSpan3, pendingLunches, userId)
            ).toBeFalsy();
        });
    });
});