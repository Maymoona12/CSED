import axiosInstance from "../../../api/index";

export const delete_account = async (body, id) => {
  const url = "/delete_account";
  return axiosInstance.post(url, body).then((response) => response.data);
};
