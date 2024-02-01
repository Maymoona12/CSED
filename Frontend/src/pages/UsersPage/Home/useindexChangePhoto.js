import { useMutation } from "@tanstack/react-query";
import { changePhoto } from "./indexChangePhoto";
import useSnackbar from "../../../context/useSnackbar";

const usechangePhoto = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: changePhoto,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Successfully change your photo ",
      });
    },
    onError: (error) => {
      console.log(error);
      showSnackbar({
        severity: "error",
        message: "Failed to change your photo",
      });
    },
  });
  return {
    mutate,
  };
};
export default usechangePhoto;
