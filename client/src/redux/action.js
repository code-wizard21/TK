import moment from "moment";
import { STATUS_ACCEPTED, STATUS_CANCELLED, STATUS_COMPLETED, STATUS_REJECTED, STATUS_REQUESTED, STATUS_WASHED } from "../store/constant";
import Http from "../utils/http";
import { OrderTypes } from "./types";
import dayjs from "dayjs";

export const fetchRequested = (role, name, from, to) => async (dispatch) => {
    try {
        const data = await Http.post("/api/order/bystatus/" + STATUS_REQUESTED, { from: from && dayjs(from).format("YYYY-MM-DD"), to: to && dayjs(to).format("YYYY-MM-DD"), company: role=='company'?name:'' });
        dispatch({type: OrderTypes.ORDER_REQUESTED_LOADED, payload: data.data});
    } catch(e) {
    }
}

export const fetchRejected = (role, name, from, to) => async (dispatch) => {
    try {
        const data = await Http.post("/api/order/bystatus/" + STATUS_REJECTED, { from: from && dayjs(from).format("YYYY-MM-DD"), to: to && dayjs(to).format("YYYY-MM-DD"), company: role=='company'?name:'' });
        dispatch({type: OrderTypes.ORDER_REJECTED_LOADED, payload: data.data});
    } catch(e) {
    }
}

export const fetchCancelled = (role, name, from, to) => async (dispatch) => {
    try {
        const data = await Http.post("/api/order/bystatus/" + STATUS_CANCELLED, { from: from && dayjs(from).format("YYYY-MM-DD"), to: to && dayjs(to).format("YYYY-MM-DD"), company: role=='company'?name:'' });
        dispatch({type: OrderTypes.ORDER_CANCELLED_LOADED, payload: data.data});
    } catch(e) {
    }
}

export const fetchInprogress = (role, name, from, to) => async (dispatch) => {
    try {
        const data = await Http.post(`/api/order/bystatus/${STATUS_ACCEPTED},${STATUS_WASHED}`, { from: role=='driver'?moment().format('YYYY-MM-DD'):(from && dayjs(from).format("YYYY-MM-DD")), to: role=='driver'?moment().format('YYYY-MM-DD'):(to && dayjs(to).format("YYYY-MM-DD")), company: role=='company'?name:'' });
        dispatch({type: OrderTypes.ORDER_INPROGRESS_LOADED, payload: data.data});
    } catch(e) {
    }
}

export const fetchCompleted = (role, name, from, to) => async (dispatch) => {
    try {
        const data = await Http.post("/api/order/bystatus/" + STATUS_COMPLETED, { from: role=='admin'?(from && dayjs(from).format("YYYY-MM-DD")):moment().format('YYYY-MM-DD'), to: role=='admin'?(to && dayjs(to).format("YYYY-MM-DD")):moment().format('YYYY-MM-DD'), company: role=='company'?name:'' });
        dispatch({type: OrderTypes.ORDER_COMPLETED_LOADED, payload: data.data});
    } catch(e) {
    }
}