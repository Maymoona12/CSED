import { useQuery } from "@tanstack/react-query";
import { getnotification} from "./indexNotifications";

const useNotification = () => {
  const { data: notifications } = useQuery({
    queryKey: ["get_notification"],
    queryFn: getnotification,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);}
  });
  return {
    notifications,
  };
};
export default useNotification;