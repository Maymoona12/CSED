import { useMutation } from "@tanstack/react-query";
import { createAnnouncement } from "./index";
import useSnackbar from "../../context/useSnackbar";

const usePostAnnouncement = () => {
  const { showSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: createAnnouncement,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
      showSnackbar({
        severity: "success",
        message: "Post Announcement Successfully",
      });
    },
    onError: (error) => {
      console.log(error);
      showSnackbar({
        severity: "error",
        message: "Post Announcement Failed ",
      });
    },
  });
  // return {
  //   mutate,
  // };
};
export default usePostAnnouncement;
