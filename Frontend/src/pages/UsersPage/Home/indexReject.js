import axiosInstance from "../../../api/index";

export const reject_appointment = async (body, id) => {
  const url = "/reject_appointment";
  return axiosInstance.post(url, body).then((response) => response.data);
};
