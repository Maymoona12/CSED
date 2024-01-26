import { useQuery } from "@tanstack/react-query";
import { getnotification} from "./indexappbar";

const useappbar = () => {
  const { data: myAppointment } = useQuery({
    queryKey: ["getnotification"],
    queryFn: getnotification,
  });
  return {
    getnotification,
  };
};
export default useappbar;