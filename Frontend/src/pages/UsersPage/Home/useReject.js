import { useMutation } from "@tanstack/react-query";
import { reject_appointment } from "./indexReject";
import useSnackbar from "../../../context/useSnackbar";

const useReject = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: reject_appointment,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Successfully reject appointment",
      });
    },
    onError: (error) => {
      console.log(error);
      showSnackbar({
        severity: "error",
        message: "Failed to reject appointment",
      });
    },
  });
  return {
    mutate,
  };
};
export default useReject;
