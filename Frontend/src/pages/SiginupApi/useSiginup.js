import { useMutation } from "@tanstack/react-query";
import { signup } from "./index";
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../context/useSnackbar";

const useSignup = () => {
  const { showSnackbar } = useSnackbar();
  const { onSignup } = useAuth();
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
        message: "Failed to signup the account",
      });
    },
  });
  return {
    mutate,
  };
};
export default useSignup;
