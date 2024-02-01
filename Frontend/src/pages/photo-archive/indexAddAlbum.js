import axiosInstance from "../../api/index";

export const  AddnewAlbum = async (body) => {
  const url = "/create_folder";
  return axiosInstance.post(url, body).then((response) => response.data);
};