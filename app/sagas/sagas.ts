import { fork } from "redux-saga/effects";

import { loginSaga } from "./loginSaga/loginSaga";
import { logoutSaga } from "./logoutSaga/logoutSaga";
import { lunchesSaga } from "./lunchesSaga/lunchesSaga";
import { userAccountSaga } from "./userAccountSaga/userAccountSaga";

export default function* () {
    yield [
        fork(loginSaga),
        fork(userAccountSaga),
        fork(logoutSaga),
        fork(lunchesSaga)
    ];
}