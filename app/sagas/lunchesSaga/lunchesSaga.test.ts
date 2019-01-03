
import { put, call } from 'redux-saga/effects';

import * as lunchesSaga from './lunchesSaga';

import { LunchActions } from '../../state/lunches/types';
import { lunchesActionsCreators } from './../../state/lunches/actions';
import lunchesService from '../../api/lunchesService/lunchesService';

jest.mock('react-native-google-signin', () => ({}));
jest.mock('../../api/lunchesService/lunchesService', () => ({
    getLunches: () => ({})
}));

describe('lunchesSaga', () => {
    
    describe('getLunchesFlow', () => {
        let lunchesGen: IterableIterator<any>;
        
        describe('Error has occured when trying to fetch lunches data', () => {
            beforeEach(() => {
                lunchesGen = lunchesSaga.getLunchesFlow();
                lunchesGen.next();
            });
            
            it(`should put ${LunchActions.REQUEST_FAIL} with custom error message`, () => { 
                expect(lunchesGen.throw({}).value)
                    .toEqual(
                        put(lunchesActionsCreators.requestFail('Error when trying to fetch lunches.'))
                    );
            });

            it(`should put ${LunchActions.REQUEST_FAIL} with given error message`, () => {
                const error = {
                    message: 'Given error.'
                };  
                expect(lunchesGen.throw(error).value)
                    .toEqual(
                        put(lunchesActionsCreators.requestFail(error.message))
                    );
            }); 
        });

        describe('The User has successfully fetch lunches data', () => {
            beforeAll(() => {
                lunchesGen = lunchesSaga.getLunchesFlow();
            });

            it('should start action request', () => {
                expect(lunchesGen.next().value)
                    .toEqual(
                        put(lunchesActionsCreators.startRequest())
                    );
            });

            it('should get lunches from api', () => {
                expect(lunchesGen.next().value)
                    .toEqual(
                        call(
                            [lunchesService, lunchesService.getLunches]
                        )
                    );
            });

            it('should put lunches data to store', () => {
                expect(lunchesGen.next({}).value)
                    .toEqual(
                        put(
                            lunchesActionsCreators.setLunches({})
                        )
                    )
            });

            it('should put request success action', () => {
                expect(lunchesGen.next().value)
                    .toEqual(
                        put(
                            lunchesActionsCreators.requestSuccess()
                        )
                    );
                });
                
            it('should be done', () => {
                expect(lunchesGen.next().done)
                    .toBeTruthy();
            })
        });
    });
});