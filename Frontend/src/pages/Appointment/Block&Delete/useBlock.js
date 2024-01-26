import { useMutation } from "@tanstack/react-query";
import { blocked_appointment } from "./indexBlock";
import useSnackbar from "../../../context/useSnackbar";

const useBlock = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: blocked_appointment,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Successfully change your details",
      });
    },
    onError: (error) => {
      console.log(error.message);
      showSnackbar({
        severity: "error",
        message: "Failed to change your details",
      });
    },
  });
  return {
    mutate,
  };
};
export default useBlock;
