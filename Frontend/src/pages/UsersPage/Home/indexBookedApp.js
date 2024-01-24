import axiosInstance from "../../../api/index";

export const bookedAppointment = async () => {
  const url = "/my_booked_app";
  return axiosInstance.get(url).then((response) => response.data);
};
