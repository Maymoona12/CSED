import axiosInstance from "../../api/index";

export const getPhoto = async (id) => {
  const url = `/get_images/${id}`;
  const data = await axiosInstance.get(url).then((response) => response.data);
  return data;
};
