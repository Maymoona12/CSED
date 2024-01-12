import { useMutation } from "@tanstack/react-query";
import Logout from "./Logout";
import useAuth from "../../hooks/useAuth";

const useLogout = () => {
  const { onLogout } = useAuth();

  const { mutate: logoutOperation, isLoading: isLoggingOut } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      onLogout();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { logoutOperation, isLoggingOut };
};

export default useLogout;
