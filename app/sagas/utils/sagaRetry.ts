import { call } from "redux-saga/effects";

// export const sagaRetry = (
//     generatorFn,
//     catchErrorFn,
//     retryTimes: number = 3,
// ) => {
//     return function* retry(...args) {
//         let retryTimesIndex: number = 0;
//         while (retryTimesIndex <= retryTimes) {
//             try {
//                 yield call(generatorFn, args);
//                 break;
//             } catch (err) {
//                 if (retryTimesIndex > retryTimes)
//                     yield call(catchErrorFn);
//             }
//         }
//     }
// }

// export function sagaRetry(retryTimes: number = 3, retryVariableName: string = 'currentRetryTimesIndex', errFn: (e) => void = (e) => { console.log(e) }): any {
//     return function (target: object, propertyKey: string, descriptor: PropertyDescriptor) {
//         Object.defineProperty(target, retryVariableName, {
//             value: 0,
//             writable: true
//         });
//         const originalMethod: Function = descriptor.value;

//         descriptor.value = function* () {
//             const that = this;
//             const args = arguments;
//             function* fn() {
//                 try {
//                     this[retryVariableName] += 1;
//                     yield call(originalMethod.apply(that, args));
//                 } catch (err) {
//                     if (this[retryVariableName] <= retryTimes)
//                         yield call(fn);
//                     else
//                         yield call(errFn, err);
//                 }
//             }
//             yield call(fn);
//         }
//     }
// }