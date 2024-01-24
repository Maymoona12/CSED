import axiosInstance from "../../api/index";

export const bookedAppointments = async (id) => {
  const url = `/doctor_appointments/${id}`;
  return axiosInstance.get(url).then((response) => response.data);
};
