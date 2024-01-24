import { useQuery } from "@tanstack/react-query";
import { bookedAppointments } from "./indexBookAppointment";

const useBookAppointment = () => {
  const { data: book } = useQuery({
    queryKey: ["doctors_BookAppointment"],
    queryFn: bookedAppointments,
  });
  return {
    book,
  };
};
export default useBookAppointment;
