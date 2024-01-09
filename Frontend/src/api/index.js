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
  baseURL: "http://localhost:5173",
  ...defaultAxiosSettings,
});

export default axiosInstance;
