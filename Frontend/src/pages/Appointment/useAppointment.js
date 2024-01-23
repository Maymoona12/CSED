import { useMutation } from "@tanstack/react-query";
import { AddAppointment } from "./indexAppointment";
import useSnackbar from "../../context/useSnackbar";

const useAppointment = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: AddAppointment,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Successfully Add Your Appointments ",
      });
    },
    onError: (error) => {
      console.log(error.message);
      showSnackbar({
        severity: "error",
        message: "Failed To Add  Your Appointments ",
      });
    },
  });
  return {
    mutate,
  };
};
export default useAppointment;
