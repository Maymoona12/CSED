import axiosInstance from "../../../api/index";

export const addFile = async (body) => {
  const url = "/import_students";
  return axiosInstance.post(url, body).then((response) => response.data);
};
