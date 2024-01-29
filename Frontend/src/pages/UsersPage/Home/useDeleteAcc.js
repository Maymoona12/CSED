import { useMutation } from "@tanstack/react-query";
import { delete_account } from "./indexDeleteAcc";
import useSnackbar from "../../../context/useSnackbar";

const useDeleteAcc = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: delete_account,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Successfully delete account ",
      });
    },
    onError: (error) => {
      console.log(error);
      showSnackbar({
        severity: "error",
        message: "Failed to delete account",
      });
    },
  });
  return {
    mutate,
  };
};
export default useDeleteAcc;
