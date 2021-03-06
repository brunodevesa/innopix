import * as type from "../types";

const initalState = {
  data: null,
  loading: false,
  loaded: false,
  error: null,
};

export default function show(state = initalState, action) {
  switch (action.type) {
    case type.GET_SHOW_REQUESTED:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case type.GET_SHOW_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.data,
      };
    case type.GET_SHOW_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
        loaded: false,
      };
    default:
      return state;
  }
}
