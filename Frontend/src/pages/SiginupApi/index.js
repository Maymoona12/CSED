import axiosInstance from "../../api/index";

export const signup = async (body) => {
  const url = "/register";
  return axiosInstance.post(url, body).then((response) => response.data);
};
