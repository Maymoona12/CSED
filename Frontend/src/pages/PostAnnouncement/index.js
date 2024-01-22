import axiosInstance from "../../api/index";

export const  createAnnouncement= async (body) => {
  const url = "/createAnnouncement";
  return axiosInstance.post(url, body).then((response) => response.data);
};
