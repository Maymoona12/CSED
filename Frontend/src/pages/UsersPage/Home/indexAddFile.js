import axiosInstance from "../../../api/index";

export const addFile = async (body, id) => {
  const url = "/import_student";
  return axiosInstance.post(url, body).then((response) => response.data);
};
