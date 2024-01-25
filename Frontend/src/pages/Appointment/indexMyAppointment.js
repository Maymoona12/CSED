import axiosInstance from "../../api/index";

export const myAppointments = async () => {
  const url = `/my_appointments`;
  return axiosInstance.get(url).then((response) => response.data);
};
