import { useMutation } from "@tanstack/react-query";
import { login } from "./index";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const useLogin = () => {
  const[open,setOpen]=useState(false);
  const[alert,setAlert]=useState();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const { onLogin } = useAuth();
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      localStorage.setItem("access-token", data.authorization.token);
      localStorage.setItem("user", JSON.stringify(data.user));
     setOpen(true);
     console.log(open);
      setAlert("Successfully Login ")
      onLogin(data?.data, { shouldNavigate: true });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  return {
    mutate,
    open,
    alert,
    handleClose,
  };
};
export default useLogin;
