import { combineReducers } from "redux";
import bugReducer from "./bugSlice";
import projectReducer from "./projectSlice";
import userReducer from "./userSlice";

export default combineReducers({
  bugs: bugReducer,
  projects: projectReducer,
  users: userReducer,
});
