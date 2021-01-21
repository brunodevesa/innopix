import * as type from "../types";

export function getShow(show) {
  return {
    type: type.GET_SHOW_REQUESTED,
    payload: show,
  };
}


export function getEpisodeByNumber(episode) {
  return {
    type: type.GET_DETAILS_REQUESTED,
    payload: episode,
  };
}
