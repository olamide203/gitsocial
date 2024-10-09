import { useQuery } from "@tanstack/react-query";
import fetcher from "~/libs/fetcher";

const followersQuery = {
  queryKey: ["followers"],
  queryFn: () => fetcher("/api/user/followers"),
};

export const useFollowers = () => {
  const { data, isLoading, isError, error } = useQuery(followersQuery);
  return { data, isLoading, isError, error };
};
