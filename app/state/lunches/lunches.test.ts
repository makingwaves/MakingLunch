import {
    AddChatMessagePayload,
    AddLunchMemberPayload, CreateLunchPayload,
    Location, Lunch,
    LunchActions,
    LunchesState,
    LunchStatus, Message, RemoveLunchMemberPayload,
    SetLunchLocationPayload, SetLunchStatusPayload, SetLunchTimePayload, TimeSpan, UpdateLunchPayload,
} from './types';
import {RequestState} from '../common/types';
import {Reducer} from 'redux-testkit';
import {lunchesReducer} from './reducer';
import {lunchesActionsCreator} from './actions';

describe('lunches reducer', () => {
    let initialState: LunchesState;

    beforeAll(() => {
        initialState = {
            request: {
                state: RequestState.none,
                errorMsg: '',
            },
            data: {},
        };
    });

    test(`should have initial state`, () => {
        Reducer(lunchesReducer).expect({type: ''}).toReturnState(initialState);
    });

    test('should not change state when action does not exist', () => {
        Reducer(lunchesReducer).expect({type: 'NOT_EXISTING'}).toReturnState(initialState);
    });

    describe('action creators', () => {
        test(LunchActions.CREATE_LUNCH, () => {
            const lunchPayload: CreateLunchPayload = {
                lunchId: 'lId',
                creatorId: 'cId',
                time: {
                    start: '2018-08-28T09:07:11.566Z',
                    end: '2018-08-28T09:10:11.566Z',
                },
                location: {
                    latitude: 25.25,
                    longitude: 53.53,
                    range: 300,
                },
            };

            expect(lunchesActionsCreator.createLunch(lunchPayload)).toEqual({
                type: LunchActions.CREATE_LUNCH,
                payload: lunchPayload,
            });
        });

        test(LunchActions.SET_LUNCH_STATUS, () => {
            const pendingPayload: SetLunchStatusPayload = {lunchId: 'lId', lunchStatus: LunchStatus.pending};
            const runningPayload: SetLunchStatusPayload = {lunchId: 'lId', lunchStatus: LunchStatus.running};
            const finishedPayload: SetLunchStatusPayload = {lunchId: 'lId', lunchStatus: LunchStatus.finished};
            expect(lunchesActionsCreator.setLunchStatus(pendingPayload))
                .toEqual({type: LunchActions.SET_LUNCH_STATUS, payload: pendingPayload});
            expect(lunchesActionsCreator.setLunchStatus(runningPayload))
                .toEqual({type: LunchActions.SET_LUNCH_STATUS, payload: runningPayload});
            expect(lunchesActionsCreator.setLunchStatus(finishedPayload))
                .toEqual({type: LunchActions.SET_LUNCH_STATUS, payload: finishedPayload});
        });

        test(LunchActions.UPDATE_LUNCH, () => {
            const lunchUpdate: UpdateLunchPayload = {
                oldLunchId: 'oldId',
                newLunchId: 'newId',
                status: LunchStatus.running,
                members: ['mem1', 'mem2'],
                times: {
                    mem1: {
                        start: '2018-08-28T09:07:11.566Z',
                        end: '2018-08-28T09:10:11.566Z',
                    },
                    mem2: {
                        start: '2018-08-28T09:08:11.566Z',
                        end: '2018-08-28T09:10:11.566Z',
                    },
                },
                locations: {
                    mem1: {
                        latitude: 25.25,
                        longitude: 53.53,
                        range: 300,
                    },
                    mem2: {
                        latitude: 26.25,
                        longitude: 52.53,
                        range: 200,
                    },
                },
            };

            expect(lunchesActionsCreator.updateLunch(lunchUpdate)).toEqual({
                type: LunchActions.UPDATE_LUNCH,
                payload: lunchUpdate,
            });
        });

        test(LunchActions.REMOVE_LUNCH, () => {
            const lunchId = 'lId';
            expect(lunchesActionsCreator.removeLunch(lunchId)).toEqual({
                type: LunchActions.REMOVE_LUNCH,
                payload: lunchId,
            });
        });

        test(LunchActions.ADD_LUNCH_MEMBER, () => {
            const memberPayload: AddLunchMemberPayload = {
                lunchId: 'lId',
                memberId: 'mId',
                timeSpan: {
                    start: '2018-08-28T09:07:11.566Z',
                    end: '2018-08-28T09:10:11.566Z',
                },
                location: {
                    latitude: 25.25,
                    longitude: 53.53,
                    range: 300,
                },
            };

            expect(lunchesActionsCreator.addLunchMember(memberPayload)).toEqual({
                type: LunchActions.ADD_LUNCH_MEMBER,
                payload: memberPayload,
            });
        });

        test(LunchActions.REMOVE_LUNCH_MEMBER, () => {
            const removeMemberPayload: RemoveLunchMemberPayload = {
                lunchId: 'lId',
                memberId: 'mId',
            };
            expect(lunchesActionsCreator.removeLunchMember(removeMemberPayload)).toEqual({
                type: LunchActions.REMOVE_LUNCH_MEMBER,
                payload: removeMemberPayload,
            });
        });

        test(LunchActions.SET_LUNCH_LOCATION, () => {
            const locationPayload: SetLunchLocationPayload = {
                lunchId: 'lId',
                memberId: 'mId',
                location: {
                    latitude: 25.25,
                    longitude: 53.53,
                    range: 300,
                },
            };

            expect(lunchesActionsCreator.setLunchLocation(locationPayload)).toEqual({
                type: LunchActions.SET_LUNCH_LOCATION,
                payload: locationPayload,
            });
        });

        test(LunchActions.SET_LUNCH_TIME, () => {
            const timePayload: SetLunchTimePayload = {
                lunchId: 'lId',
                memberId: 'mId',
                time: {
                    start: '2018-08-28T09:07:11.566Z',
                    end: '2018-08-28T09:10:11.566Z',
                },
            };

            expect(lunchesActionsCreator.setLunchTime(timePayload)).toEqual({
                type: LunchActions.SET_LUNCH_TIME,
                payload: timePayload,
            });
        });

        test(LunchActions.ADD_CHAT_MESSAGE, () => {
            const message: Message = {
                messageId: 'messageId',
                memberId: 'memberId',
                time: '2018-08-28T09:07:11.566Z',
                message: 'Test message',
            };

            const messagePayload: AddChatMessagePayload = {
                lunchId: 'lId',
                message,
            };

            expect(lunchesActionsCreator.addChatMessage(messagePayload)).toEqual({
                type: LunchActions.ADD_CHAT_MESSAGE,
                payload: messagePayload,
            });
        });

        test(LunchActions.START_REQUEST, () => {
            expect(lunchesActionsCreator.startRequest()).toEqual({type: LunchActions.START_REQUEST});
        });
        test(LunchActions.REQUEST_SUCCESS, () => {
            expect(lunchesActionsCreator.requestSuccess()).toEqual({type: LunchActions.REQUEST_SUCCESS});
        });
        test(LunchActions.REQUEST_FAIL, () => {
            const errorMsg = 'Shit happens';
            expect(lunchesActionsCreator.requestFail(errorMsg))
                .toEqual({type: LunchActions.REQUEST_FAIL, payload: errorMsg});
        });
    });

    describe('lunch actions', () => {
        let location1: Location;
        let location2: Location;
        let time1: TimeSpan;
        let time2: TimeSpan;
        let mem1Id: string;
        let mem2Id: string;
        let existingLunchState: LunchesState;
        let lunch1Id: string;
        let lunch2Id: string;

        beforeAll(() => {
            location1 = {
                latitude: 25.25,
                longitude: 53.53,
                range: 300,
            };

            location2 = {
                latitude: 26.25,
                longitude: 52.53,
                range: 450,
            };

            time1 = {
                start: '2018-08-28T09:07:11.566Z',
                end: '2018-08-28T09:10:11.566Z',
            };

            time2 = {
                start: '2018-08-28T09:08:31.566Z',
                end: '2018-08-28T09:09:11.566Z',
            };

            mem1Id = 'mem1';
            mem2Id = 'mem2';
            lunch1Id = 'lunch1';
            lunch2Id = 'lunch2';

            const oneMemberLunch: Lunch = {
                id: lunch1Id,
                status: LunchStatus.pending,
                locations: {
                    [mem1Id]: location1,
                },
                times: {
                    [mem1Id]: time1,
                },
                members: [mem1Id],
                chat: {},
            };

            const twoMemberLunch: Lunch = {
                id: lunch2Id,
                status: LunchStatus.running,
                locations: {
                    [mem1Id]: location1,
                    [mem2Id]: location2,
                },
                times: {
                    [mem1Id]: time1,
                    [mem2Id]: time2,
                },
                members: [mem1Id, mem2Id],
                chat: {},
            };

            existingLunchState = {
                ...initialState,
                data: {
                    [lunch1Id]: oneMemberLunch,
                    [lunch2Id]: twoMemberLunch,
                },
            };
        });

        test(LunchActions.CREATE_LUNCH, () => {
            const lunchId = 'lunchId';
            const createLunchPayload: CreateLunchPayload = {
                lunchId,
                creatorId: mem1Id,
                location: location1,
                time: time1,
            };

            const createAction = lunchesActionsCreator.createLunch(createLunchPayload);
            Reducer(lunchesReducer).expect(createAction).toReturnState({
                ...initialState,
                data: {
                    [lunchId]: {
                        id: lunchId,
                        status: LunchStatus.pending,
                        locations: {
                            [mem1Id]: location1,
                        },
                        times: {
                            [mem1Id]: time1,
                        },
                        members: [mem1Id],
                        chat: {},
                    },
                },
            });
        });

        test(LunchActions.UPDATE_LUNCH, () => {
            const updatedLunch: Lunch = {
                id: 'updatedLunch1',
                status: LunchStatus.running,
                members: ['mem1', 'mem2'],
                times: {
                    mem1: {
                        start: '2018-08-28T09:07:11.566Z',
                        end: '2018-08-28T09:10:11.566Z',
                    },
                    mem2: {
                        start: '2018-08-28T09:08:11.566Z',
                        end: '2018-08-28T09:10:11.566Z',
                    },
                },
                locations: {
                    mem1: {
                        latitude: 25.25,
                        longitude: 53.53,
                        range: 300,
                    },
                    mem2: {
                        latitude: 26.25,
                        longitude: 52.53,
                        range: 200,
                    },
                },
                chat: {},
            };

            const updatePayload: UpdateLunchPayload = {
                oldLunchId: lunch1Id,
                newLunchId: 'updatedLunch1',
                status: LunchStatus.running,
                members: ['mem1', 'mem2'],
                times: {
                    mem1: {
                        start: '2018-08-28T09:07:11.566Z',
                        end: '2018-08-28T09:10:11.566Z',
                    },
                    mem2: {
                        start: '2018-08-28T09:08:11.566Z',
                        end: '2018-08-28T09:10:11.566Z',
                    },
                },
                locations: {
                    mem1: {
                        latitude: 25.25,
                        longitude: 53.53,
                        range: 300,
                    },
                    mem2: {
                        latitude: 26.25,
                        longitude: 52.53,
                        range: 200,
                    },
                },
            };

            const updateAction = lunchesActionsCreator.updateLunch(updatePayload);
            Reducer(lunchesReducer).withState(existingLunchState).expect(updateAction).toReturnState({
                ...existingLunchState,
                data: {
                    ...existingLunchState.data,
                    updatedLunch1: updatedLunch,
                },
            });
        });

        test(LunchActions.SET_LUNCH_STATUS, () => {
            const pendingPayload: SetLunchStatusPayload = {lunchId: lunch2Id, lunchStatus: LunchStatus.pending};
            const runningPayload: SetLunchStatusPayload = {lunchId: lunch1Id, lunchStatus: LunchStatus.running};
            const finishedPayload: SetLunchStatusPayload = {lunchId: lunch1Id, lunchStatus: LunchStatus.finished};
            const setPendingStatusAction = lunchesActionsCreator.setLunchStatus(pendingPayload);
            const setRunningStatusAction = lunchesActionsCreator.setLunchStatus(runningPayload);
            const setFinishedStatusAction = lunchesActionsCreator.setLunchStatus(finishedPayload);

            Reducer(lunchesReducer).withState(existingLunchState).expect(setPendingStatusAction).toReturnState({
                ...existingLunchState,
                data: {
                    [lunch2Id]: {
                        ...existingLunchState.data[lunch2Id],
                        status: LunchStatus.pending,
                    },
                },
            });

            Reducer(lunchesReducer).withState(existingLunchState).expect(setRunningStatusAction).toReturnState({
                ...existingLunchState,
                data: {
                    [lunch1Id]: {
                        ...existingLunchState.data[lunch1Id],
                        status: LunchStatus.running,
                    },
                },
            });

            Reducer(lunchesReducer).withState(existingLunchState).expect(setFinishedStatusAction).toReturnState({
                ...existingLunchState,
                data: {
                    [lunch1Id]: {
                        ...existingLunchState.data[lunch1Id],
                        status: LunchStatus.finished,
                    },
                },
            });
        });

        test(LunchActions.REMOVE_LUNCH, () => {
            const removeLunch1 = lunchesActionsCreator.removeLunch(lunch1Id);

            Reducer(lunchesReducer).withState(existingLunchState).expect(removeLunch1).toReturnState({
                ...existingLunchState,
                data: {
                    [lunch2Id]: existingLunchState.data[lunch2Id],
                },
            });

            const oneLunchState = {
                ...initialState,
                data: {
                    [lunch2Id]: existingLunchState.data[lunch2Id],
                },
            };

            const removeLunch2 = lunchesActionsCreator.removeLunch(lunch2Id);
            Reducer(lunchesReducer).withState(oneLunchState).expect(removeLunch2).toReturnState({
                ...initialState,
            });
        });

        test(LunchActions.ADD_LUNCH_MEMBER, () => {
            const addMemberPayload: AddLunchMemberPayload = {
                lunchId: lunch1Id,
                memberId: mem2Id,
                timeSpan: time2,
                location: location2,
            };

            const addLunchMember = lunchesActionsCreator.addLunchMember(addMemberPayload);
            Reducer(lunchesReducer).withState(existingLunchState).expect(addLunchMember).toReturnState({
                ...existingLunchState,
                data: {
                    ...existingLunchState.data,
                    [lunch1Id]: {
                        ...existingLunchState.data[lunch1Id],
                        members: [mem1Id, mem2Id],
                        locations: {
                            ...existingLunchState.data[lunch1Id].locations,
                            [mem2Id]: location2,
                        },
                        times: {
                            ...existingLunchState.data[lunch1Id].times,
                            [mem2Id]: time2,
                        },
                    },
                },
            });
        });

        test(LunchActions.REMOVE_LUNCH_MEMBER, () => {
            const removePayload: RemoveLunchMemberPayload = {
                lunchId: lunch2Id,
                memberId: mem2Id,
            };
            const removeMemberAction = lunchesActionsCreator.removeLunchMember(removePayload);
            Reducer(lunchesReducer).withState(existingLunchState).expect(removeMemberAction).toReturnState({
                ...existingLunchState,
                data: {
                    ...existingLunchState.data,
                    [lunch2Id]: {
                        ...existingLunchState.data[lunch2Id],
                        locations: {
                            [mem1Id]: location1,
                        },
                        times: {
                            [mem1Id]: time1,
                        },
                        members: [mem1Id],
                    },
                },
            });
        });

        test(LunchActions.SET_LUNCH_LOCATION, () => {
            const changedLocation = {
                latitude: 10.12,
                longitude: 18.10,
                range: 100,
            };

            const setLocationPayload: SetLunchLocationPayload = {
                lunchId: lunch2Id,
                memberId: mem1Id,
                location: changedLocation,
            };

            const setAction = lunchesActionsCreator.setLunchLocation(setLocationPayload);
            Reducer(lunchesReducer).withState(existingLunchState).expect(setAction).toReturnState({
                ...existingLunchState,
                data: {
                    ...existingLunchState.data,
                    [lunch2Id]: {
                        ...existingLunchState.data[lunch2Id],
                        locations: {
                            [mem2Id]: location2,
                            [mem1Id]: changedLocation,
                        },
                    },
                },
            });
        });

        test(LunchActions.SET_LUNCH_TIME, () => {
            const changedTime = {
                start: '2018-09-21T09:08:11.566Z',
                end: '2018-09-21T09:11:11.566Z',
            };

            const setTimePayload: SetLunchTimePayload = {
                lunchId: lunch1Id,
                memberId: mem1Id,
                time: changedTime,
            };

            const setTimeAction = lunchesActionsCreator.setLunchTime(setTimePayload);
            Reducer(lunchesReducer).withState(existingLunchState).expect(setTimeAction).toReturnState({
                ...existingLunchState,
                data: {
                    ...existingLunchState.data,
                    [lunch1Id]: {
                        ...existingLunchState.data[lunch1Id],
                        times: {
                            [mem1Id]: changedTime,
                        },
                    },
                },
            });
        });

        test(LunchActions.ADD_CHAT_MESSAGE, () => {
            const message1Id = 'message1';
            const message2Id = 'message2';
            const message1: Message = {
                messageId: message1Id,
                memberId: mem1Id,
                time: '2018-09-21T09:08:11.566Z',
                message: 'Test message 1',
            };

            const message2: Message = {
                messageId: message2Id,
                memberId: mem2Id,
                time: '2018-09-21T09:11:11.566Z',
                message: 'Test message 2',
            };

            const stateWithMessage = {
                ...existingLunchState,
                data: {
                    ...existingLunchState.data,
                    [lunch2Id]: {
                        ...existingLunchState.data[lunch2Id],
                        chat: {
                            [message1Id]: message1,
                        },
                    },
                },
            };

            const message1Payload: AddChatMessagePayload = {
                lunchId: lunch2Id,
                message: message1,
            };

            const message2Payload: AddChatMessagePayload = {
                lunchId: lunch2Id,
                message: message2,
            };

            const addMessage1Action = lunchesActionsCreator.addChatMessage(message1Payload);
            const addMessage2Action = lunchesActionsCreator.addChatMessage(message2Payload);

            Reducer(lunchesReducer)
                .withState(existingLunchState)
                .expect(addMessage1Action)
                .toReturnState(stateWithMessage);

            Reducer(lunchesReducer).withState(stateWithMessage).expect(addMessage2Action).toReturnState({
                ...stateWithMessage,
                data: {
                    ...stateWithMessage.data,
                    [lunch2Id]: {
                        ...stateWithMessage.data[lunch2Id],
                        chat: {
                            [message1Id]: message1,
                            [message2Id]: message2,
                        },
                    },
                },
            });
        });
    });

    describe('request actions', () => {
        let requestInProgressState: LunchesState;
        beforeAll(() => {
            requestInProgressState = {
                ...initialState,
                request: {
                    state: RequestState.inProgress,
                    errorMsg: '',
                },
            };
        });

        test(`${LunchActions.START_REQUEST} - should reflect request start state`, () => {
            const startAction = lunchesActionsCreator.startRequest();
            Reducer(lunchesReducer).expect(startAction).toReturnState({
                ...initialState,
                request: {
                    state: RequestState.inProgress,
                    errorMsg: '',
                },
            });
        });

        test(`${LunchActions.REQUEST_SUCCESS} - should reflect request success state`, () => {
            const successAction = lunchesActionsCreator.requestSuccess();
            Reducer(lunchesReducer).withState(requestInProgressState).expect(successAction).toReturnState({
                ...initialState,
                request: {
                    state: RequestState.succeeded,
                    errorMsg: '',
                },
            });
        });

        test(`${LunchActions.REQUEST_FAIL} - should reflect request failed state`, () => {
            const errorMsg = 'Shit happens';
            const failAction = lunchesActionsCreator.requestFail(errorMsg);
            Reducer(lunchesReducer).withState(requestInProgressState).expect(failAction).toReturnState({
                ...initialState,
                request: {
                    state: RequestState.failed,
                    errorMsg,
                },
            });
        });
    });
});
