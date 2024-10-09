import { useQuery } from "@tanstack/react-query";
import fetcher from "~/libs/fetcher";

const userByUsernameQuery = (username: string) => ({
  queryKey: ["user", username],
  queryFn: () => fetcher(`/api/users/${username}`),
});

export const useUserByUsername = (username: string) => {
  const { data, isLoading, isError, error } = useQuery(
    userByUsernameQuery(username),
  );
  return { data, isLoading, isError, error };
};
