import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import verifyAccessToken from "./verifyAccessToken";
import useAuth from "../hooks/useAuth";

const useAccessToken = () => {
  const { onLogin, onLogout } = useAuth();

  const [isVerifying, setIsVerifying] = useState(true);

  const { data } = useQuery(["verifyAccessToken"], verifyAccessToken, {
    retry: false, // don't retry if the API call fails
    onSuccess: ({ data }) => {
      console.log(data);
      onLogin(data);
    },
    onError: (error) => {
      onLogout();
      // if (location.pathname.includes("/me"))
    },
    onSettled: () => {
      setIsVerifying(false);
    },
  });

  return { data, isVerifying };
};

export default useAccessToken;
