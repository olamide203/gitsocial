import fetcher, { FetchError } from "../libs/fetcher";
import {
  useQuery,
  QueryFunctionContext,
  UseQueryOptions,
} from "@tanstack/react-query";

const getUser = async ({ queryKey }: QueryFunctionContext<Array<string>>) => {
  const [url] = queryKey;

  const data = await fetcher("/api/user");

  return data;
};

export const userQuery: UseQueryOptions<any, FetchError, any, Array<string>> = {
  queryKey: ["user"],
  queryFn: getUser,
};

export const useUser = () => {
  const { data, error, isLoading, isError } = useQuery(userQuery);
  return { data, error, isLoading, isError };
};
