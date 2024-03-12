import { combineReducers } from "redux";
import AuthReducer from "./auth.reducer";
import OrderReducer from "./order.reducer";

const allReducers = {
  // Put all of the reducers here!
  auth: AuthReducer,
  orders: OrderReducer,

};

const rootReducer = combineReducers(allReducers);

export default rootReducer;