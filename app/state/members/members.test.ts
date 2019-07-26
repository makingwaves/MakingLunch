import { Member, MembersActions, MembersMap, MembersState } from './types';
import { RequestState } from '../common/types';
import { Reducer } from 'redux-testkit';
import { membersReducer } from './reducer';
import { membersActionsCreators } from './actions';

describe('members reducer', () => {
    let initialState: MembersState;

    beforeAll(() => {
        initialState = {
            requestState: RequestState.none,
            data: {},
        };
    });

    test(`should have initial state`, () => {
        Reducer(membersReducer).expect({ type: '' }).toReturnState(initialState);
    });

    test('should not change state when action does not exist', () => {
        Reducer(membersReducer).expect({ type: 'NOT_EXISTING' }).toReturnState(initialState);
    });

    describe('action creators', () => {
        test(MembersActions.SET_MEMBER, () => {
            const member: Member = {
                id: 'mId',
                name: 'mName',
                description: 'mDesc',
                photo: 'mPhotoUrl',
            };

            expect(membersActionsCreators.setMember(member))
                .toEqual({ type: MembersActions.SET_MEMBER, payload: member });
        });

        test(MembersActions.BATCH_SET_MEMBERS, () => {
            const members = {
                mId1: {
                    id: 'mId1',
                    name: 'mName1',
                    description: 'mDesc1',
                    photo: 'mPhotoUrl1',
                },
                mId2: {
                    id: 'mId2',
                    name: 'mName2',
                    description: 'mDesc2',
                    photo: 'mPhotoUrl2',
                },
            };

            expect(membersActionsCreators.batchSetMembers(members)).toEqual({
                type: MembersActions.BATCH_SET_MEMBERS,
                payload: members,
            });
        });

        test(MembersActions.REMOVE_MEMBER, () => {
            const id = 'removedId';
            expect(membersActionsCreators.removeMember(id)).toEqual({ type: MembersActions.REMOVE_MEMBER, payload: id });
        });

        test(MembersActions.REMOVE_ALL_MEMBERS, () => {
            expect(membersActionsCreators.removeAllMembers()).toEqual({ type: MembersActions.REMOVE_ALL_MEMBERS });
        });

        test(MembersActions.START_REQUEST, () => {
            expect(membersActionsCreators.startRequest()).toEqual({ type: MembersActions.START_REQUEST });
        });

        test(MembersActions.REQUEST_SUCCESS, () => {
            expect(membersActionsCreators.requestSuccess()).toEqual({ type: MembersActions.REQUEST_SUCCESS });
        });

        test(MembersActions.REQUEST_FAIL, () => {
            expect(membersActionsCreators.requestFail()).toEqual({
                type: MembersActions.REQUEST_FAIL
            });
        });
    });

    describe('members actions', () => {

        let member1: Member;
        let member2: Member;
        let stateWithMembers: MembersState;

        beforeAll(() => {
            member1 = {
                id: 'mId1',
                name: 'mName1',
                description: 'mDesc1',
                photo: 'mPhotoUrl1',
            };

            member2 = {
                id: 'mId2',
                name: 'mName2',
                description: 'mDesc2',
                photo: 'mPhotoUrl2',
            };

            stateWithMembers = {
                ...initialState,
                data: {
                    mId1: member1,
                    mId2: member2,
                },
            };
        });

        test(`${MembersActions.SET_MEMBER} - should set member`, () => {
            const member: Member = {
                id: 'mId',
                name: 'mName',
                description: 'mDesc',
                photo: 'mPhotoUrl',
            };

            const changedMember: Member = {
                id: 'mId',
                name: 'changedMName',
                description: 'changedMDesc',
                photo: 'changedMPhotoUrl',
            };

            const setAction = membersActionsCreators.setMember(member);
            Reducer(membersReducer).expect(setAction).toReturnState({ ...initialState, data: { mId: member } });
            const changeAction = membersActionsCreators.setMember(changedMember);
            Reducer(membersReducer).expect(changeAction).toReturnState({ ...initialState, data: { mId: changedMember } });
        });

        test(`${MembersActions.BATCH_SET_MEMBERS} - should batch set members`, () => {
            const members: MembersMap = {
                mId1: {
                    id: 'mId1',
                    name: 'mName1',
                    description: 'mDesc1',
                    photo: 'mPhotoUrl1',
                },
                mId2: {
                    id: 'mId2',
                    name: 'mName2',
                    description: 'mDesc2',
                    photo: 'mPhotoUrl2',
                },
            };

            const batchSetAction = membersActionsCreators.batchSetMembers(members);
            Reducer(membersReducer).expect(batchSetAction).toReturnState({ ...initialState, data: members });
        });

        test(`${MembersActions.REMOVE_MEMBER} - should remove member`, () => {
            const remId = 'mId1';
            const removeAction = membersActionsCreators.removeMember(remId);
            Reducer(membersReducer).withState(stateWithMembers).expect(removeAction).toReturnState({
                ...initialState,
                data: {
                    mId2: member2,
                },
            });
        });

        test(`${MembersActions.REMOVE_ALL_MEMBERS} - should remove all members`, () => {
            const removeAllAction = membersActionsCreators.removeAllMembers();
            Reducer(membersReducer).withState(stateWithMembers).expect(removeAllAction).toReturnState(initialState);
        });
    });

    describe('request actions', () => {
        let requestInProgressState: MembersState;
        beforeAll(() => {
            requestInProgressState = {
                ...initialState,
                requestState: RequestState.inProgress
            };
        });

        test(`${MembersActions.START_REQUEST} - should reflect request start state`, () => {
            const startAction = membersActionsCreators.startRequest();
            Reducer(membersReducer).expect(startAction).toReturnState({
                ...initialState,
                requestState: RequestState.inProgress
            });
        });

        test(`${MembersActions.REQUEST_SUCCESS} - should reflect request success state`, () => {
            const successAction = membersActionsCreators.requestSuccess();
            Reducer(membersReducer).withState(requestInProgressState).expect(successAction).toReturnState({
                ...initialState,
                requestState: RequestState.succeeded
            });
        });

        test(`${MembersActions.REQUEST_FAIL} - should reflect request failed state`, () => {
            const failAction = membersActionsCreators.requestFail();
            Reducer(membersReducer).withState(requestInProgressState).expect(failAction).toReturnState({
                ...initialState,
                requestState: RequestState.failed
            });
        });
    });
});
