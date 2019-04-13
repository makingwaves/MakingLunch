import { mapDataToResponse, keyToString, hasKey } from "./utils";

jest.mock('react-native-google-signin', () => ({
    GoogleSignin: {
        hasPlayServices: () => true,
        signIn: () => ({})
    }
}));

describe('Utils', () => {
    const correctObject = {
        name: 'MyName',
        surname: 123
    };
    const inCorrectObject = 'MyName';

    describe('hasKey Function', () => {
        it('should return true, when given object has key', () => {
            expect(hasKey(correctObject, 'name'))
                .toBeTruthy();
        });

        it('should return false, when given object does not have key', () => {
            expect(hasKey(correctObject, 'notMyName'))
                .toBeFalsy();
            expect(hasKey(correctObject, (123 as any)))
                .toBeFalsy();
        });

        it('should return false, when args are incorrect', () => {
            expect(hasKey(inCorrectObject, 'notMyName'))
                .toBeFalsy();
            expect(hasKey(inCorrectObject, (123 as any)))
                .toBeFalsy();
            expect(hasKey(inCorrectObject, (true as any)))
                .toBeFalsy();
        });
    });

    describe('keyToString Function', () => {
        it('should transform key value to string', () => {
            expect(typeof keyToString(correctObject, 'name'))
                .toBe('string');
            expect(typeof keyToString(correctObject, 'surname'))
                .toBe('string');
        });

        it('should return undefined if given object does not have key', () => {
            expect(keyToString(correctObject, 'notMySurname'))
                .toBeUndefined();
        });

        it('should return undefined, when args are incorrect', () => {
            expect(keyToString(inCorrectObject, 'notMyName'))
                .toBeUndefined();
            expect(keyToString(undefined, null))
                .toBeUndefined();
        });
    });

    describe('mapDataToResponse Function', () => {
        it('should return object with empty string values', () => {
            const data = {};
            const expected = {
                name: '',
                photo: '',
                description: '',
                loginProvider: 'facebook',
                loginProviderToken: '123',
                id: ''
            };

            expect(mapDataToResponse(data as any, 'facebook', expected.loginProviderToken))
                .toEqual(expected);
        });
    });
});