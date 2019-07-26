import { RequestState } from '@app/state/common/types';
import { getGivenUserPhoto } from "./userImageSelectors";
import { MembersMap, MembersState } from "@app/state/members/types";
import { AppState } from '@app/state/state';

describe('UserImageSelectors', () => {
    let initialMembersState: MembersState;

    beforeAll(() => {
        const membersState: MembersMap = {
            '1': {
                id: '1',
                name: '1',
                photo: 'photo1',
                description: 'desc1'
            },
            '2': {
                id: '2',
                name: '2',
                photo: 'photo2',
                description: 'desc2'
            },
            '3': {
                id: '3',
                name: '3',
                photo: 'photo3',
                description: 'desc3'
            }
        };

        initialMembersState = {
            data: membersState,
            requestState: RequestState.succeeded
        };
    });

    it('get photo, when user is defined in store', () => {
        expect(
            getGivenUserPhoto({ members: initialMembersState } as AppState, '1')
        ).toBe('photo1');
        expect(
            getGivenUserPhoto({ members: initialMembersState } as AppState, '2')
        ).toBe('photo2');
        expect(
            getGivenUserPhoto({ members: initialMembersState } as AppState, '3')
        ).toBe('photo3');
    });

    it('get undefined, when user is not defined in store', () => {
        expect(
            getGivenUserPhoto({ members: initialMembersState } as AppState, '4')
        ).toBeUndefined();
    });
});