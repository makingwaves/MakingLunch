import { fork, all } from "redux-saga/effects";
import { watchAuthSagas } from "@app/sagas/user/auth/hooks";
import { watchProfileSagas } from "@app/sagas/user/profile/hooks";
import { chatSaga } from "./chatSaga/chatSaga";
import { lunchesSaga } from "./lunchesSaga/lunchesSaga";

const sagas = [
    watchAuthSagas,
    watchProfileSagas,

     lunchesSaga, chatSaga
].map(s => fork(s));

export default function* () {
    yield all(sagas);
}