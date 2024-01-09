import axios from "axios";

const defaultAxiosSettings = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "access-token": localStorage.getItem("access-token") ?? "",
  },
};

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  ...defaultAxiosSettings,
});

export default axiosInstance;
