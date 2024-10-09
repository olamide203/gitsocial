import fetcher from "~/libs/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleRepo = (repo: any) => {
  const queryClient = useQueryClient();
  const url = `/api/user/starred/${repo.owner.login}/${repo.name}`;
  return useMutation({
    mutationFn: ({ isStarred }: { isStarred: boolean }) => {
      const init: RequestInit = {
        method: isStarred ? "PUT" : "DELETE",
        credentials: "include",
      };
      return fetcher(url, init);
    },
    onMutate: async (newData: { isStarred: boolean }) => {
      await queryClient.cancelQueries({ queryKey: [url] });

      //snapshot the previous value
      const previousData = queryClient.getQueryData([url]);

      //optimistically set new value
      queryClient.setQueryData([url], newData);
      //return a context of new data and previous data
      return { previousData, newData };
    },
    // If the mutation fails, use the context we returned above
    onError: (err, newData, context) => {
      queryClient.setQueryData([url], context?.previousData);
    },
    // Always refetch ater error or success
    onSettled: () => queryClient.invalidateQueries({ queryKey: [url] }),
  });
};
