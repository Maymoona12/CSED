import { useMutation } from "@tanstack/react-query";
import { delete_appointment } from "./indexDelete";
import useSnackbar from "../../../context/useSnackbar";

const useDelete = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: delete_appointment,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Successfully Delete the appointment",
      });
    },
    onError: (error) => {
      console.log(error.message);
      showSnackbar({
        severity: "error",
        message: "Failed to Delete the appointment",
      });
    },
  });
  return {
    mutate,
  };
};
export default useDelete;
