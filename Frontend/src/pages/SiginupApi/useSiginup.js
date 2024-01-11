import { useMutation } from "@tanstack/react-query";
import { signup } from "./index";
import useAuth from "../../hooks/useAuth";

const useSignup = () => {
  const { onLogin } = useAuth();
  const { mutate } = useMutation({
    mutationFn: signup,
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
export default useSignup;
