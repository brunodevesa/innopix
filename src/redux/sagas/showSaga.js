import { call, put, takeEvery } from "redux-saga/effects";
import * as type from "../types";

let showName = "Powerpuff Girls";
let showNameUncoded = decodeURI(showName);

const url_single_search = `http://api.tvmaze.com/singlesearch/shows?q=${showNameUncoded}`;

/**
 * Generic fetch function to perform http requests from external api.
 * @param {String} url 
 */
function getApi(url) {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
}

/**
 * Fetch episodes by id from api.
 * @param {Number} episode_id 
 */
function fetchEpisodes(episode_id) {
  const url_episodes_search = `http://api.tvmaze.com/shows/${episode_id}/episodes`;
  return fetch(url_episodes_search)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
}

/**
 * Fetch show data from api.
 * @param {Object} action 
 */
function* fetchShow(action) {
  try {
    const data = yield call(getApi, url_single_search);

    // get the show id to fetch the show's episodes api
    let episode_id = data.id;
    const data_episodes = yield call(fetchEpisodes, episode_id);

    // add episodes to the show data
    data["episodes"] = data_episodes;

    // put all the show+episodes fetched info into data
    yield put({ type: type.GET_SHOW_SUCCESS, data: data });

    console.log(data);
  } catch (error) {
    yield put({ type: type.GET_SHOW_FAILED, message: error.message });
  }
}

function* showSaga() {
  yield takeEvery(type.GET_SHOW_REQUESTED, fetchShow);
}


export default showSaga;
