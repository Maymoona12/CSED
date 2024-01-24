import axiosInstance from "../../api/index";

export const bookedAppointments = async () => {
  const url = `/doctor_appointments`;
  return axiosInstance.get(url).then((response) => response.data);
};
