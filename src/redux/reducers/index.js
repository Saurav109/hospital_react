import isLogged from "./isLogged";
import counter from "./counter";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  isLogged: isLogged,
  counter: counter,
});

export default allReducer;
