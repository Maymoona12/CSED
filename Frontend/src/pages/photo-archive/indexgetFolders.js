import axiosInstance from "../../api/index";

export const getFolders = async () => {
  const url = "/get_folders";
  return axiosInstance.get(url).then((response) => response.data);
};
