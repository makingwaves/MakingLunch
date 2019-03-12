import { AppState } from '@app/state/state';
import { ChatProps } from './../ChatMessages';
import { mapLunchData } from "./chatMessagesSelectors";
import { RequestState, Request } from "@app/state/common/types";
import { LunchesState, LunchStatus, Lunch, LunchesMap, Message, MessageStatus } from "@app/state/lunches/types";

const getChatProps = (lunchId: string): ChatProps => {
    return {
        navigation: {
            getParam: () => ({ id: lunchId })
        }
    } as any;
};

describe('ChatMessageSelectors', () => {
    let lunch: Lunch;
    let selectorResult;
    let initialLunchesState: LunchesState;

    const message1: Message = {
        messageId: 'message1',
        memberId: 'user1',
        time: 'Mon Mar 03 2019 14:30:23 GMT+0100',
        message: 'message1message',
        status: MessageStatus.finished
    };
    const message2: Message = {
        messageId: 'message2',
        memberId: 'user2',
        time: 'Mon Mar 03 2019 14:30:21 GMT+0100',
        message: 'message2message',
        status: MessageStatus.finished
    };
    const message3: Message = {
        messageId: 'message3',
        memberId: 'user1',
        time: 'Mon Mar 03 2019 14:30:24 GMT+0100',
        message: 'message3message',
        status: MessageStatus.finished
    };

    beforeAll(() => {
        const requestState: Request = {
            state: RequestState.succeeded,
            errorMsg: ''
        };

        lunch = {
            id: 'defaultLunch',
            status: LunchStatus.finished,
            locations: {},
            chat: {
                'message1': message1,
                'message2': message2,
                'message3': message3
            },
            isCancelling: false,
            members: ['user1', 'user2', 'user3'],
            times: {
                'defaultLunch': {
                    begin: 'Mon Mar 03 2019 13:30:23 GMT+0100',
                    end: 'Mon Mar 03 2019 15:30:23 GMT+0100'
                }
            }
        }

        initialLunchesState = {
            request: requestState,
            data: {
                'defaultLunch': lunch
            }
        };

        selectorResult = mapLunchData({ lunches: initialLunchesState } as AppState, getChatProps('defaultLunch'));
    });

    it('get lunch id', () => {
        expect(
            selectorResult.id
        ).toBe(lunch.id);
    });

    it('get lunch membersIds', () => {
        expect(
            selectorResult.members
        ).toBe(lunch.members);
    });

    it('get formatted lunch date', () => {
        expect(
            selectorResult.lunchDate
        ).toEqual({
            date: '2019.03.03',
            hour: '13:30'
        });
    });

    it('get sorted lunch messages', () => {
        expect(
            selectorResult.chatMessages
        ).toEqual([
            message3, message1, message2
        ])
    });
});