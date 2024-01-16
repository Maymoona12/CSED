import { useMutation } from "@tanstack/react-query";
import { editProfile } from "./index";
import useSnackbar from "../../../../context/useSnackbar";

const useEditProfile = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: editProfile,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Successfully change your details",
      });
    },
    onError: (error) => {
      console.log(error.message);
      showSnackbar({
        severity: "error",
        message: "Failed to change your details",
      });
    },
  });
  return {
    mutate,
  };
};
export default useEditProfile;
