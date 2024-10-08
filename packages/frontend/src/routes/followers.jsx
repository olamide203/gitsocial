import React from "react";
import useSWR from "swr";
import User from "../components/User/User";

export default () => {
  const { data: followers, error } = useSWR([
    "/api/user/followers",
    { method: "GET", credentials: "include" },
  ]);
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-auto-fill-2 md:grid-cols-auto-fill grid-flow-row-dense">
      {followers &&
        followers.data.map((profile, index) => (
          <User username={profile.login} key={index} />
        ))}
    </div>
  );
};
