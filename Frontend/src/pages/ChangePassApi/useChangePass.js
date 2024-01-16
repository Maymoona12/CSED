import { useMutation } from "@tanstack/react-query";
import { changePassword } from "./index";
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../context/useSnackbar";

const useChangePass = () => {
  const { showSnackbar } = useSnackbar();
  const { onLogout } = useAuth();
  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      onLogout();
      showSnackbar({
        severity: "success",
        message: "Change your password Successfully",
      });
    },
    onError: (error) => {
      console.log(error.message);
      showSnackbar({
        severity: "error",
        message: "Failed to change your password",
      });
    },
  });
  return {
    mutate,
  };
};
export default useChangePass;
