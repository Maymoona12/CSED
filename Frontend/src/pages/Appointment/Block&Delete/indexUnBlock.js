import axiosInstance from "../../../api/index";

export const unblock_appointment = async (body) => {
  const url = "/unblocked_app";
  return axiosInstance.post(url, body).then((response) => response.data);
};
