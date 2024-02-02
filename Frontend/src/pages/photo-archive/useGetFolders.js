import { useQuery } from "@tanstack/react-query";
import { getFolders } from "./indexgetFolders";

const useGetFolders = () => {
  const { data } = useQuery({
    queryKey: ["folders_data"],
    queryFn: getFolders,
  });
  const folders = data && data[0] ? data[0] : [];
  return {
    folders,
  };
};
export default useGetFolders;
