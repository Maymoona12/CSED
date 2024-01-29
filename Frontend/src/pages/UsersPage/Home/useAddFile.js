import { useMutation } from "@tanstack/react-query";
import { addFile } from "./indexAddFile";
import useSnackbar from "../../../context/useSnackbar";

const useAddFile = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: addFile,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Successfully add file ",
      });
    },
    onError: (error) => {
      console.log(error);
      showSnackbar({
        severity: "error",
        message: "Failed to add file",
      });
    },
  });
  return {
    mutate,
  };
};
export default useAddFile;
