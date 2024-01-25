import { useMutation } from "@tanstack/react-query";
import { reason } from "./indexReason";
import useSnackbar from "../../context/useSnackbar";

const useReason = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: reason,
    onSuccess: (data) => {
      console.log(data);
      showSnackbar({
        severity: "success",
        message: "Successfully send your reason",
      });
    },

    onError: (error) => {
      console.log(error);
      showSnackbar({
        severity: "error",
        message: "Failed to send your reason",
      });
    },
  });
  return {
    mutate,
  };
};
export default useReason;
