import useSWR from "swr";
import fetcher from "../libs/fetcher";

export default function useUser() {
  const { data, error } = useSWR(
    ["/user", { method: "GET", credentials: "include" }],
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;

        // Never retry on 401
        if (error.status === 401) return;

        // Only retry up to 5 times.
        if (retryCount >= 3) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    },
  );
  const loading = !data && !error;
  const loggedOut = error && error.status === 401;
  return { loading, loggedOut, user: data };
}
