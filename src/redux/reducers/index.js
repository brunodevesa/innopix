import { combineReducers } from "redux";
import show from "../reducers/show";
import details from "./details";

const rootReducer = combineReducers({
  // put all the reducers inside this object
  show: show,
  details: details,
});

export default rootReducer;
