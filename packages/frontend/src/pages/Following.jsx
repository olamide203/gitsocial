import React from "react";
import useSWR from "swr";
import User from "../components/User/User";

function Following() {
    const { data: following, error } = useSWR([
        "/user/following",
        { method: "GET", credentials: "include" },
    ]);
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-auto-fill-2 md:grid-cols-auto-fill grid-flow-row-dense">
            {following &&
                following.data.map((profile, index) => (
                    <User username={profile.login} key={index} />
                ))}
        </div>
    );
}

export default Following;
