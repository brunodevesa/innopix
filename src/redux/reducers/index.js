import { combineReducers } from "redux";
import show from "../reducers/show";

const rootReducer = combineReducers({
  // put all the reducers inside this object
  show: show,
});

export default rootReducer;
