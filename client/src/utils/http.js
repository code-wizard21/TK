import axios from "axios";
const token = localStorage.getItem("authToken");
const Http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default Http;
