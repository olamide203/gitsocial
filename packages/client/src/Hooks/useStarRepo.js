import { useSWRConfig } from "swr";
import useUser from "./useUser";

export default function useStarRepo(data, repo) {
    const { mutate } = useSWRConfig();
    const { user } = useUser();
    const starred = { ...data, status: 204 };
    const options = { optimisticData: starred, rollbackOnError: true };

    // update the local data immediately
    // send a request to update the dat
    // trigger a revalidation (refetch) to make sure our local data is correct
    mutate(
        `/user/starred/${user.data.login}/${repo}`,
        fetcher(`/user/starred/${user.data.login}/${repo}`, {
            method: "PUT",
            credentials: "include",
        }),
        options
    );
}
