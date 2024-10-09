import { useQuery } from "@tanstack/react-query";
import fetcher from "../libs/fetcher";

const repositoriesQuery = (page: number, limit: number, type: string) => ({
  queryKey: ["repos", type, page, limit],
  queryFn: () =>
    fetcher(`/api/user/${type}?sort=created&page=${page}&limit=${limit}`),
});

export const useRepositories = (page: number, limit: number, type: string) => {
  const { data, isLoading, isError, error } = useQuery(
    repositoriesQuery(page, limit, type),
  );
  return { data, isLoading, isError, error };
};
