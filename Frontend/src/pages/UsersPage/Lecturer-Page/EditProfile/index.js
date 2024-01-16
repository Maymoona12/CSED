import axiosInstance from "../../../../api/index";

export const editProfile = async (body) => {
  const url = "/edit_profile";
  return axiosInstance.post(url, body).then((response) => response.data);
};
