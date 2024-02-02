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

      if (data.user.reg_no) {
        console.log("Registration successful for reg_no:", data.user.reg_no);
      }
      onSignup();
      showSnackbar({
        severity: "success",
        message: "Successfully signup the account",
      });
    },
    onError: (error) => {
      console.log(error.message);

      // Check if error has a data property and reg_no inside it
      if (error.response && error.response.data && error.response.data.reg_no) {
        console.log(
          "Error: Registration failed for reg_no:",
          error.response.data.reg_no
        );
      }
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
