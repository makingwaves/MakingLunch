import { all, fork } from "redux-saga/effects";

import { loginSaga } from "./loginSaga/loginSaga";


export default function* () {
    yield all([
        fork(loginSaga)
    ])
}