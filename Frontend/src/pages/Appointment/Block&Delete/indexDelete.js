import axiosInstance from "../../../api/index";

export const delete_appointment = async (body) => {
  const url = "/delete_app";
  return axiosInstance.post(url, body).then((response) => response.data);
};
