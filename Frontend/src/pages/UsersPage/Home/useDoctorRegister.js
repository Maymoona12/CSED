import { useMutation } from "@tanstack/react-query";
import { doctor_register } from "./indexDoctoReg";
import useSnackbar from "../../../context/useSnackbar";

const useDoctorRegister = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: doctor_register,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Successfully add new lecturer ",
      });
    },
    onError: (error) => {
      console.log(error);
      showSnackbar({
        severity: "error",
        message: "Failed to add new lecturer",
      });
    },
  });
  return {
    mutate,
  };
};
export default useDoctorRegister;
