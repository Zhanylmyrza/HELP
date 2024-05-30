import { combineReducers } from "redux";

import auth from "./auth";
import person from './personReducers'
import chat from "./chat";

export default combineReducers({
  auth,
  person,
  chat,
});
