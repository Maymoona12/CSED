import axiosInstance from "../../api/index";

export const getnotification = async () => {
  const url = "/get_notifi_app";
  return axiosInstance.get(url).then((response) => response.data);
};