import { useQuery } from "@tanstack/react-query";
import { bookedAppointment } from "./indexBookedApp";

const usebookedAppointment = () => {
  const { data: booked } = useQuery({
    queryKey: ["booked_appointment"],
    queryFn: bookedAppointment,
  });
  return {
    booked,
  };
};
export default usebookedAppointment;
