import { QueryClient } from "@tanstack/react-query";
import { userQuery } from "~/hooks/useUser";
import { redirect } from "react-router-dom";

export const loader = (queryClient: QueryClient) => async () => {
  try {
    await queryClient.ensureQueryData({ ...userQuery, retry: 1 });
    return null;
  } catch (error) {
    return redirect("/login");
  }
};
