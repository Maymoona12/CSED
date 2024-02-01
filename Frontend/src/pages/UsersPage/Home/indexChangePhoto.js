import axiosInstance from "../../../api/index";

export const changePhoto = async (body) => {
  const url = "/Change_photo";
  return axiosInstance.post(url, body).then((response) => response.data);
};
