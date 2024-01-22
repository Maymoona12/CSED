import { useQuery } from "@tanstack/react-query";
import { lecturersprofile } from "./index";

const uselecturersprofile = () => {
  const { data: doctors } = useQuery({
    queryKey: ["doctors_data"],
    queryFn: lecturersprofile,
  });
  return {
    doctors,
  };
};
export default uselecturersprofile;
