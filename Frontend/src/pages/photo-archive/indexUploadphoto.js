import axiosInstance from "../../api/index";

export const Uploadphoto = async (body) => {
  const url = "/add_images";
  return axiosInstance.post(url, body).then((response) => response.data);
};
