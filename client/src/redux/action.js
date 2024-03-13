import moment from "moment";
import { STATUS_ACCEPTED, STATUS_CANCELLED, STATUS_COMPLETED, STATUS_REJECTED, STATUS_REQUESTED, STATUS_WASHED } from "../store/constant";
import Http from "../utils/http";
import { OrderTypes } from "./types";

export const fetchRequested = (role, name) => async (dispatch) => {
    try {
        const data = await Http.post("/api/order/bystatus/" + STATUS_REQUESTED, { company: role=='company'?name:'' });
        dispatch({type: OrderTypes.ORDER_REQUESTED_LOADED, payload: data.data});
    } catch(e) {
    }
}

export const fetchRejected = (role, name) => async (dispatch) => {
    try {
        const data = await Http.post("/api/order/bystatus/" + STATUS_REJECTED, { company: role=='company'?name:'' });
        dispatch({type: OrderTypes.ORDER_REJECTED_LOADED, payload: data.data});
    } catch(e) {
    }
}

export const fetchCancelled = (role, name) => async (dispatch) => {
    try {
        const data = await Http.post("/api/order/bystatus/" + STATUS_CANCELLED, { company: role=='company'?name:'' });
        dispatch({type: OrderTypes.ORDER_CANCELLED_LOADED, payload: data.data});
    } catch(e) {
    }
}

export const fetchInprogress = (role, name) => async (dispatch) => {
    try {
        const data = await Http.post(`/api/order/bystatus/${STATUS_ACCEPTED},${STATUS_WASHED}`, { company: role=='company'?name:'', date: role=='driver'?moment().format('YYYY-MM-DD'):'' });
        dispatch({type: OrderTypes.ORDER_INPROGRESS_LOADED, payload: data.data});
    } catch(e) {
    }
}

export const fetchCompleted = (role, name) => async (dispatch) => {
    try {
        const data = await Http.post("/api/order/bystatus/" + STATUS_COMPLETED, { company: role=='company'?name:'', date: moment().format('YYYY-MM-DD') });
        dispatch({type: OrderTypes.ORDER_COMPLETED_LOADED, payload: data.data});
    } catch(e) {
    }
}