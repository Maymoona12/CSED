import axiosInstance from "../api/index";

const verifyAccessToken = async () => {
  const url = "/refresh";
  return axiosInstance
    .get(url, {
      headers: {
        "access-token": localStorage.getItem("access-token") ?? "",
      },
    })
    .then((res) => res.data);
};

export default verifyAccessToken;
