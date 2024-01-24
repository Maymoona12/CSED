import axiosInstance from "../../api/index";

export const bookedAppointments = async (doctor_id) => {
  const url = `/doctor_appointments/${doctor_id}`;
  const data = await axiosInstance.get(url).then((response) => response.data);
  return data;
};
