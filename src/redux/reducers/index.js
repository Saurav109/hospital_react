import isLogged from "./isLogged";
import counter from "./counter";
import { combineReducers } from "redux";
import isLoading from "./isLoading";

const allReducer = combineReducers({
  isLogged: isLogged,
  counter: counter,
  isLoading: isLoading,
});

export default allReducer;
