import { AppState } from '@app/state/state';
import { Request, RequestState } from "@app/state/common/types";
import { getPendingAndRunningLunches } from './mainContentSelector';
import { LunchesState, LunchesMap, LunchStatus, Lunch } from "@app/state/lunches/types";

describe('MainContentSelector', () => {
    let initialLunchesState: LunchesState;

    beforeAll(() => {
        const requestState: Request = {
            state: RequestState.succeeded,
            errorMsg: ''
        };

        initialLunchesState = {
            request: requestState,
            data: null
        };
    });

    it('pending and running lunches are undefined', () => {
        expect(
            getPendingAndRunningLunches({ lunches: initialLunchesState } as AppState)
        ).toEqual({
            pending: null,
            running: null
        });
    });

    it('pending lunches are defined, neither running', () => {
        const lunchesState: LunchesMap = {
            '1': {
                id: '1',
                status: LunchStatus.pending,
                locations: {},
                members: [],
                times: {},
                chat: {},
                isCancelling: false
            }
        };

        expect(
            getPendingAndRunningLunches({ lunches: { ...initialLunchesState, data: lunchesState } } as AppState)
        ).toEqual({
            pending: lunchesState,
            running: undefined
        });
    });

    it('running lunches are defined, neither pending', () => {
        const runningLunch: Lunch = {
            id: '1',
            status: LunchStatus.running,
            locations: {},
            members: [],
            times: {},
            chat: {},
            isCancelling: false
        };
        const lunchesState: LunchesMap = {
            '1': runningLunch
        };

        expect(
            getPendingAndRunningLunches({ lunches: { ...initialLunchesState, data: lunchesState } } as AppState)
        ).toEqual({
            pending: {},
            running: runningLunch
        });
    });

    it('running and pending lunches are defined', () => {
        const runningLunch: Lunch = {
            id: '1',
            status: LunchStatus.running,
            locations: {},
            members: [],
            times: {},
            chat: {},
            isCancelling: false
        };
        const pendingLunch1: Lunch = {
            id: '2',
            status: LunchStatus.pending,
            locations: {},
            members: [],
            times: {},
            chat: {},
            isCancelling: false
        };
        const pendingLunch2: Lunch = {
            id: '3',
            status: LunchStatus.pending,
            locations: {},
            members: [],
            times: {},
            chat: {},
            isCancelling: false
        };
        const lunchesState: LunchesMap = {
            '1': runningLunch,
            '2': pendingLunch1,
            '3': pendingLunch2
        };

        expect(
            getPendingAndRunningLunches({ lunches: { ...initialLunchesState, data: lunchesState } } as AppState)
        ).toEqual({
            pending: {
                '2': pendingLunch1,
                '3': pendingLunch2
            },
            running: runningLunch
        });
    });
})