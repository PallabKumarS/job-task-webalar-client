import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "./useAxios";

const Loader = (url, query) => {
  const { isLoading, refetch, data } = useQuery({
    queryKey: [`${query}`],
    queryFn: async () => {
      const res = await axiosPublic.get(url);
      return res.data;
    },
  });

  return { isLoading, data, refetch };
};

export default Loader;
