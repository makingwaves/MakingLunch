import { AppState } from '@app/state/state';
import { AuthState } from "@app/state/auth/types";
import { mapLunchesToArray } from "./lunchesListSelectors";
import { RequestState, Request } from "@app/state/common/types";
import { LunchesState, LunchesMap, LunchStatus, Lunch } from "@app/state/lunches/types";

const getRunningLunch = (id: string, begin: string, end: string): Lunch => {
    return {
        id: id,
        status: LunchStatus.finished,
        locations: {},
        chat: {},
        isCancelling: false,
        members: [],
        times: {
            [id]: {
                begin: begin,
                end: end
            }
        }
    }
}

describe('LunchesListSelectors', () => {
    const userId: string = 'userId123';

    let initialAuthState: AuthState;
    let initialLunchesState: LunchesState;

    beforeAll(() => {
        const requestState: Request = {
            state: RequestState.succeeded,
            errorMsg: ''
        };
        initialAuthState = {
            request: requestState,
            profile: {
                id: userId
            } as any,
            token: undefined
        };
        initialLunchesState = {
            request: requestState,
            data: null
        };
    });

    it('get undefined object, when lunches are not defined', () => {
        expect(
            mapLunchesToArray({ lunches: initialLunchesState, auth: initialAuthState } as AppState)
        ).toBeNull();
    });

    it('get sorted lunches from store', () => {
        const running1: Lunch = getRunningLunch('running1', 'Mon Mar 03 2019 13:30:23 GMT+0100', 'Mon Mar 03 2019 15:30:23 GMT+0100');
        const running2: Lunch = getRunningLunch('running2', 'Mon Mar 03 2019 12:11:23 GMT+0100', 'Mon Mar 03 2019 16:30:23 GMT+0100');
        const running3: Lunch = getRunningLunch('running3', 'Mon Mar 04 2019 13:16:23 GMT+0100', 'Mon Mar 04 2019 15:30:23 GMT+0100');
        const running4: Lunch = getRunningLunch('running4', 'Mon Mar 01 2019 13:16:23 GMT+0100', 'Mon Mar 01 2019 15:30:23 GMT+0100');

        const finishedLunches: LunchesMap = {
            'running1': running1,
            'running2': running2,
            'running3': running3,
            'running4': running4,
        };

        expect(
            mapLunchesToArray({ lunches: { ...initialLunchesState, data: finishedLunches }, auth: initialAuthState } as AppState)
        ).toEqual(
            [
                { title: LunchStatus.pending, data: [] },
                { title: LunchStatus.running, data: [] },
                {
                    title: LunchStatus.finished, data: [
                        running3, running1, running2, running4
                    ]
                }
            ]
        );
    });
});