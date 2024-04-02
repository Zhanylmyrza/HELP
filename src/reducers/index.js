import { combineReducers } from "redux";

import auth from "./auth";
import person from './personReducers'

export default combineReducers({
  auth,
  person,
});
