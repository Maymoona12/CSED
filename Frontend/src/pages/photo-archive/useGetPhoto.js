import { useQuery } from "@tanstack/react-query";
import { getPhoto } from "./indexGetPhoto";

const useGetPhoto = (folderId) => {
  const { data } = useQuery({
    queryKey: ["photos", folderId], // Include folderId in the query key
    queryFn: () => getPhoto(folderId),
  });
  return {
    data,
  };
};
export default useGetPhoto;
