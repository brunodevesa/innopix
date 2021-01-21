import { call, put, takeEvery } from "redux-saga/effects";
import * as type from "../types";

function getApi(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
}

function* fetchDetail(action) {
  try {
    console.log("action.payload :", action.payload);
    let query = action.payload;
    const url = `http://api.tvmaze.com/shows/${query.show}/episodebynumber?season=${query.season}&number=${query.episode}`;

    const data = yield call(getApi, url);

    yield put({ type: type.GET_DETAILS_SUCCESS, data: data });

    console.log(data);
  } catch (error) {
    yield put({ type: type.GET_DETAILS_FAILED, message: error.message });
  }
}

function* detailsSaga() {
  yield takeEvery(type.GET_DETAILS_REQUESTED, fetchDetail);
}

export default detailsSaga;
