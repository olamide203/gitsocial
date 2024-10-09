import fetcher from "../libs/fetcher";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

const checkRepoIsStarred = async ({
  queryKey,
}: QueryFunctionContext<string[]>) => {
  const [url] = queryKey;
  return fetcher(url);
};

export const useCheckRepoIsStarred = (repo: any) => {
  const { data, error, isError } = useQuery({
    queryKey: [`/api/user/starred/${repo.owner.login}/${repo.name}`],
    queryFn: checkRepoIsStarred,
  });
  const isStarred = data && data.isStarred;
  return { data, isStarred, error, isError };
};
