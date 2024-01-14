import { useMutation } from "@tanstack/react-query";
import { signup } from "./index";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const { onSignup} = useAuth();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      onSignup();
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
