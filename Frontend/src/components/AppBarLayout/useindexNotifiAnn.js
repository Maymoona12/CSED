import { useQuery } from "@tanstack/react-query";
import { getNotifiAnn } from "./indexNotifiAnn";

const useNotifiAnn = () => {
  const { data: notifiAnn } = useQuery({
    queryKey: ["get_notification_ann"],
    queryFn: getNotifiAnn,
    onSuccess: (data) => {
      console.log(data);
      console.log(data.data);
    },
  });
  return {
    notifiAnn,
  };
};
export default useNotifiAnn;
