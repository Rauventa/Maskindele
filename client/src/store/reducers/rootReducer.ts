import {combineReducers} from "redux";
import authReducer from "./Auth/authReducer";

export default combineReducers({
  authReducer: authReducer
})