import axiosInstance from "../../api/index";

export const changePassword = async (body) => {
  const url = "/change_password";
  return axiosInstance.post(url, body).then((response) => response.data);
};
