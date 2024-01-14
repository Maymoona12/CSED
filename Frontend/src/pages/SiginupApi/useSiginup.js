import { useMutation } from "@tanstack/react-query";
import { signup } from "./index";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useSnackbar from "../../context/useSnackbar";

const useSignup = () => {
  const { showSnackbar } = useSnackbar();
  const { onSignup } = useAuth();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      onSignup();
      showSnackbar({
        severity: "success",
        message: "Successfully signup the account",
      });
    },
    onError: (error) => {
      console.log(error.message);
      showSnackbar({
        severity: "error",
        message: "Failed signup to your account",
      });
    },
  });
  return {
    mutate,
  };
};
export default useSignup;
