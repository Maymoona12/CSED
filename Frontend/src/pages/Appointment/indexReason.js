import axiosInstance from "../../api/index";

export const reason = async (body) => {
  const url = "/book_app";
  return axiosInstance.post(url, body).then((response) => response.data);
};
