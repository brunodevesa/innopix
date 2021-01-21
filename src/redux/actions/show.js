import * as type from "../types";

export function getShow(show) {
  return {
    type: type.GET_SHOW_REQUESTED,
    payload: show,
  };
}
