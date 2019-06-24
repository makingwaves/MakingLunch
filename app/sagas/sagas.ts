import { fork, all } from "redux-saga/effects";
import { watchAuthSagas } from "@app/sagas/user/auth/hooks";
import { watchProfileSagas } from "@app/sagas/user/profile/hooks";
import { watchLunchesSagas } from "@app/sagas/lunches/hooks";
import { watchChatSagas } from "@app/sagas/chat/hooks";


const sagas = [
    watchAuthSagas,
    watchProfileSagas,
    watchLunchesSagas,
    watchChatSagas
].map(s => fork(s));

export default function* () {
    yield all(sagas);
}