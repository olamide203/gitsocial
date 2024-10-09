import { useQuery } from "@tanstack/react-query";
import fetcher from "../libs/fetcher";

const languageColorsQuery = {
  queryKey: ["colors"],
  queryFn: () =>
    fetcher(
      "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json",
      { method: "GET" },
    ),
};

export const useLanguageColors = () => {
  const { data, isError, isLoading } = useQuery(languageColorsQuery);
  return { data, isError, isLoading };
};
