import { AuthTypes, OrderTypes } from "../types";

const initialState = {
  requested: [],
  rejected: [],
  inprogress: [],
  completed: [],
  isLoading: false,
  errorMessage: "",
};

const OrderReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case OrderTypes.ORDER_REQUESTED_LOADED:
      return {
        ...state,
        requested: action.payload,
      };
    case OrderTypes.ORDER_REJECTED_LOADED:
      return {
        ...state,
        rejected: action.payload,
      };
    case OrderTypes.ORDER_INPROGRESS_LOADED:
      return {
        ...state,
        inprogress: action.payload,
      };
    case OrderTypes.ORDER_COMPLETED_LOADED:
      return {
        ...state,
        completed: action.payload,
      };
    default:
      return state;
  }
};

export default OrderReducer;
