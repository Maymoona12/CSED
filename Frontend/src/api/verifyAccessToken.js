import axiosInstance from "./index";

const verifyAccessToken = async () => {
  const url = "/auth/verifyAccessToken";
  return (
    axiosInstance.get <
    LoginResponse >
    (url,
    {
      headers: {
        "access-token": localStorage.getItem("access-token") ?? "",
      },
    }).then((res) => res.data)
  );
};

export default verifyAccessToken;
