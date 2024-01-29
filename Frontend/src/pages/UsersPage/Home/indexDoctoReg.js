import axiosInstance from "../../../api/index";

export const doctor_register = async (body) => {
  const url = "/doctor_register";
  return axiosInstance.post(url, body).then((response) => response.data);
};
