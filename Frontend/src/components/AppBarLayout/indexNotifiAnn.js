import axiosInstance from "../../api/index";

export const getNotifiAnn = async () => {
  const url = "/get_notifi_ann";
  return axiosInstance.get(url).then((response) => response.data);
};
