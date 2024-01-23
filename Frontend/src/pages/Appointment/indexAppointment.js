import axiosInstance from "../../api/index";

export const AddAppointment = async (body) => {
  const url = "/office_hour";
  return axiosInstance.post(url, body).then((response) => response.data);
};
