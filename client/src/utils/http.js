import axios from "axios";
const token = localStorage.getItem("authToken");
const Http = axios.create({
  baseURL: "http://192.168.104.84:5000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default Http;
