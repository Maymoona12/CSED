import axiosInstance from "../../api/index";

export const lecturersprofile = async () => {
  const url = "/all_doctors";
  return axiosInstance.get(url).then((response) => response.data);
};
