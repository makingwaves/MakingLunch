import { fork } from "redux-saga/effects";

import { loginSaga } from "./loginSaga/loginSaga";
import { logoutSaga } from "./logoutSaga/logoutSaga";
import { lunchesSaga } from "./lunchesSaga/lunchesSaga";
import { userAccountSaga } from "./userAccountSaga/userAccountSaga";
import { chatSaga } from "./chatSaga/chatSaga";

const sagas = [
    loginSaga, userAccountSaga, logoutSaga, lunchesSaga, chatSaga
].map(s => fork(s));

export default function* () {
    yield sagas;
}