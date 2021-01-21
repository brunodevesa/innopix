import { all } from "redux-saga/effects";
import showSaga from "./showSaga";
import detailsSaga from "./detailsSaga";

export default function* rootSaga() {
  yield all([
    // put all the sagas inside this array
    showSaga(),
    detailsSaga(),

    ]);
}
