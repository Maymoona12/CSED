import { useMutation } from "@tanstack/react-query";
import { Uploadphoto } from "./indexUploadphoto";
import useSnackbar from "../../context/useSnackbar";

const useUploadphoto = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: Uploadphoto,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Upload Photos Successfully",
      });
    },
    onError: (error) => {
      console.log(error);
      showSnackbar({
        severity: "error",
        message: "Failed to Upload Photos",
      });
    },
  });

  return { mutate };
};

export default useUploadphoto;
