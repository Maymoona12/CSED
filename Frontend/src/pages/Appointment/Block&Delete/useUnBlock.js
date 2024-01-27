import { useMutation } from "@tanstack/react-query";
import { unblock_appointment } from "./indexUnBlock";
import useSnackbar from "../../../context/useSnackbar";

const useUnBlock = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: unblock_appointment,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Successfully Unblock the appointment",
      });
    },
    onError: (error) => {
      console.log(error.message);
      showSnackbar({
        severity: "error",
        message: "Failed to Unblock the appointment",
      });
    },
  });
  return {
    mutate,
  };
};
export default useUnBlock;
