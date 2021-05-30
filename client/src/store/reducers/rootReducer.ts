import {combineReducers} from "redux";
import authReducer from "./Auth/authReducer";
import carsReducer from "./Cars/carsReducer";
import partsReducer from "./Parts/partsReducer";

export default combineReducers({
  authReducer: authReducer,
  partsReducer: partsReducer,
  carsReducer: carsReducer,
})