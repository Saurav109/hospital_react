import isLogged from "./isLogged";
import counter from "./counter";
import { combineReducers } from "redux";
import isLoading from "./isLoading";
import isDialogueVisible from "./isDialogueVisible";

const allReducer = combineReducers({
  isLogged: isLogged,
  counter: counter,
  isLoading: isLoading,
  isDialogueVisible: isDialogueVisible,
});

export default allReducer;
