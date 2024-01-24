import { useQuery } from "@tanstack/react-query";
import { bookedAppointments } from "./indexBookAppointment";

const useBookAppointment = (id) => {
  const { data: book } = useQuery({
    queryKey: ["doctors_BookAppointment"],
    queryFn: () => bookedAppointments(id),
  });
  return {
    book,
  };
};
export default useBookAppointment;
