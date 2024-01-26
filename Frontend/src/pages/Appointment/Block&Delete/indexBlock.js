import axiosInstance from "../../../api/index";

export const blocked_appointment = async (body, id) => {
  const url = "/blocked_app";
  return axiosInstance.post(url, body).then((response) => response.data);
};
