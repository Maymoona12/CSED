import { useMutation } from "@tanstack/react-query";
import Logout from "./Logout";
import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../context/useSnackbar";

const useLogout = () => {
  const { showSnackbar } = useSnackbar();
  const { onLogout } = useAuth();

  const { mutate: logoutOperation, isLoading: isLoggingOut } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      onLogout();
      showSnackbar({
        severity: "success",
        message: "Successfully logout from your account",
      });
    },

    onError: (error) => {
      console.log(error.message);
      showSnackbar({
        severity: "error",
        message: "Failed Logout",
      });
    },
  });

  return { logoutOperation, isLoggingOut };
};

export default useLogout;
