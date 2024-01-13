import axiosInstance from "../index";

const Logout = async (data) => {
  const url = "/logout";
  return axiosInstance
    .post(url, {
      headers: {
        "access-token": localStorage.getItem("access-token") ?? "",
      },
    })
    .then((res) => res.data);
};

export default Logout;
