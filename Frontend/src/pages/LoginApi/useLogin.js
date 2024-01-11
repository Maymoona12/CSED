import { useMutation } from "@tanstack/react-query";
import { login } from "./index";
import useAuth from "../../hooks/useAuth";

const useLogin = () => {
  const { onLogin } = useAuth();
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      localStorage.setItem("access-token", data.authorization.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data?.data, { shouldNavigate: true });
      //Snackbar
    },
    onError: (error) => {
      //Snackbar
      console.log(error.message);
    },
  });
  return {
    mutate,
  };
};
export default useLogin;
