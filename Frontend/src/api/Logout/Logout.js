import axiosInstance from "../index";

const Logout = async () => {
  const url = "/logout";
  return axiosInstance
    .post(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      },
    })
    .then((res) => res.data);
};

export default Logout;
