import { useQuery } from "@tanstack/react-query";
import { myAppointments } from "./indexMyAppointment";

const useMyAppo = () => {
  const { data: myAppointment } = useQuery({
    queryKey: ["My_Appointment"],
    queryFn: myAppointments,
  });
  return {
    myAppointment,
  };
};
export default useMyAppo;
