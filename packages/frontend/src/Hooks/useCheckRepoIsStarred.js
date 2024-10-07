import useSWR from "swr";
import fetcher from "../libs/fetcher";

export default function useCheckRepoIsStarred(repo) {
  const { data, error, mutate } = useSWR(
    [
      `/api/user/starred/${repo.owner.login}/${repo.name}`,
      { method: "GET", credentials: "include" },
    ],
    fetcher,
  );
  const isStarred = data && data.isStarred;
  return { isStarred, error, mutate };
}
