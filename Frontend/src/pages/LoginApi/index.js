import axiosInstance from "../../api/index";

export const login = async (body) => {
  const url = "/login";
  return axiosInstance.post(url, body).then((response) => response.data);
};
