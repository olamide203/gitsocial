import { useQuery } from "@tanstack/react-query";
import fetcher from "~/libs/fetcher";

const followeesQuery = {
  queryKey: ["following"],
  queryFn: () => fetcher("/api/user/following"),
};

export const useFollowees = () => {
  const { data, isLoading, isError, error } = useQuery(followeesQuery);
  return { data, isLoading, isError, error };
};
