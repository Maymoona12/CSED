import { useMutation } from "@tanstack/react-query";
import { login } from "./index";
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../context/useSnackbar";

const useLogin = () => {
  const { showSnackbar } = useSnackbar();
  const { onLogin } = useAuth();

  const { data: loginData, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      localStorage.setItem("access-token", data.authorization.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data?.data, { shouldNavigate: true });
      showSnackbar({
        severity: "success",
        message: "Successfully login in your account",
      });
    },

    onError: (error) => {
      console.log(error.message);
      showSnackbar({
        severity: "error",
        message: "Failed login to your account",
      });
    },
  });
  return {
    mutate,
  };
};
export default useLogin;
