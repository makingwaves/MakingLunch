import { put, call } from 'redux-saga/effects';

import * as userAccountSaga from './userAccountSaga';

import { authActionsCreators } from './../../state/auth/actions';
import { Profile, AuthActions } from '../../state/auth/types';
import { accountService } from '../../api';

jest.mock('react-native-google-signin', () => ({}));

describe('userAccountSaga', () => {
    let userData: Profile;

    beforeAll(() => {
        userData  = {
            id: '1',
            name: 'MyName',
            photo: 'MyPhoto',
            meetingsNumber: 0,
            description: 'MyDescription'
        };
    });

    describe('getUserDataFlow', () => {
        let getUserDataGen: IterableIterator<any>;

        describe('An error occured when user tried to get his data', () => {
            beforeEach(() => {
                getUserDataGen = userAccountSaga.getUserDataFlow();
                getUserDataGen.next();
            });
            
            it(`should put ${AuthActions.REQUEST_FAIL} with custom error message`, () => {
                expect(getUserDataGen.throw({}).value)
                    .toEqual(
                        put(authActionsCreators.requestFail('Error when trying to fetch user data.'))
                    );
            });

            it(`should put ${AuthActions.REQUEST_FAIL} with given error message`, () => {
                const error = {
                    message: 'Given error.'
                };  
                expect(getUserDataGen.throw(error).value)
                    .toEqual(
                        put(authActionsCreators.requestFail(error.message))
                    );
            });
        });
        

        describe('User get his data with success', () => {
            beforeAll(() => {
                getUserDataGen = userAccountSaga.getUserDataFlow();
            });
    
            it('should start action request', () => {
                expect(getUserDataGen.next().value)
                    .toEqual(
                        put(authActionsCreators.startRequest())
                    );
            });
    
            it('should call getUserData function with success', () => {
                expect(getUserDataGen.next().value)
                    .toEqual(
                        call(
                            [accountService, accountService.getUserData]
                        )
                    )
            });
            
            it('should put user profile in to store', () => {
                expect(getUserDataGen.next(userData).value)
                    .toEqual(
                        put(authActionsCreators.setProfile(userData)) 
                    );
            });
    
            it('should put requestSuccess action', () => {
                expect(getUserDataGen.next().value)
                    .toEqual(
                        put(authActionsCreators.requestSuccess())
                    );
                expect(getUserDataGen.next().done)
                    .toBeTruthy();
            });
        });
    });
    
    describe('updateUserDataFlow', () => {
        let updateUserDataGen: IterableIterator<any>;
        let updatedData: Profile;

        beforeAll(() => {
            updatedData = { ...userData, ...{
                    name: 'MyNewName!',
                    description: 'MyNewDescription!'
                }
            };
        })

        describe('An error occured when user tried to get his data', () => {
            beforeEach(() => {
                updateUserDataGen = userAccountSaga.updateUserDataFlow({ type: null, userData: updatedData });
                updateUserDataGen.next();
            });
            
            it(`should put ${AuthActions.REQUEST_FAIL} with custom error message`, () => {
                expect(updateUserDataGen.throw({}).value)
                    .toEqual(
                        put(authActionsCreators.requestFail('Error when trying to update user data.'))
                    );
            });

            it(`should put ${AuthActions.REQUEST_FAIL} with given error message`, () => {
                const error = {
                    message: 'Given error.'
                };  
                expect(updateUserDataGen.throw(error).value)
                    .toEqual(
                        put(authActionsCreators.requestFail(error.message))
                    );
            });
        });

        describe('User update his data with success', () => {
            beforeAll(() => {
                updateUserDataGen = userAccountSaga.updateUserDataFlow({ type: null, userData: updatedData });
            });

            it('should start action request', () => {
                expect(updateUserDataGen.next().value)
                    .toEqual(
                        put(authActionsCreators.startRequest())
                    );
            });
    
            it('should call updateUserData function with success', () => {
                expect(updateUserDataGen.next(updatedData).value)
                    .toEqual(
                        call(
                            [accountService, accountService.updateUserData],
                            updatedData.name, updatedData.description
                        )
                    )
            });
            
            it('should put user profile in to store', () => {
                expect(updateUserDataGen.next(updatedData).value)
                    .toEqual(
                        put(authActionsCreators.setProfile(updatedData)) 
                    );
            });
    
            it('should put requestSuccess action', () => {
                expect(updateUserDataGen.next().value)
                    .toEqual(
                        put(authActionsCreators.requestSuccess())
                    );
                expect(updateUserDataGen.next().done)
                    .toBeTruthy();
            });
        });
    });
});