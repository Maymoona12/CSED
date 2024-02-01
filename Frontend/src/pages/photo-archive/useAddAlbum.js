import { useMutation } from "@tanstack/react-query";
import { AddnewAlbum } from "./indexAddAlbum";
import useSnackbar from "../../context/useSnackbar";

const useAddAlbum = () => {
  const { showSnackbar } = useSnackbar();
  const { mutate } = useMutation({
    mutationFn: AddnewAlbum,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Add New Album Successfully",
      });
    },
    onError: (error) => {
      console.log(error);
      showSnackbar({
        severity: "error",
        message: "Failed to Add New Album",
      });
    },
  });

  return { mutate };
};

export default useAddAlbum;
