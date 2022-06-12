import React from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function User({ username }) {
    const { data: user, error } = useSWR([
        `/users/${username}`,
        { method: "GET", credentials: "include" },
    ]);
    const profile = user && user.data;
    return (
        <>
            {profile && (
                <div className="grid bg-neutral p-4 rounded gap-4 shadow grid-cols-1 md:grid-cols-auto">
                    <div className="avatar w-28 aspect-square mx-auto my-3 relative">
                        <div className=" rounded-full">
                            <img src={profile.avatar_url} alt="" />
                        </div>
                    </div>
                    <div className="text-center md:text-left md:mx-4 my-auto overflow-x-hidden">
                        <h3 className="text-lg md:text-md capitalize font-bold overflow-ellipsis">
                            {profile.name?.toLowerCase()}
                        </h3>
                        <h3 className="text-sm truncate">@{profile.login}</h3>
                        {profile.twitter_username && (
                            <a
                                href={`https://twitter.com/${profile.twitter_username}`}
                                className="btn btn-circle mt-2 mr-2 bg-blue-600 text-white border-none"
                                target="_blank"
                            >
                                <FaTwitter className="text-xl" />
                            </a>
                        )}
                        <a
                            href={profile.html_url}
                            className="btn btn-circle bg-blue-600 mt-2 mr-2 text-white border-none"
                            target="_blank"
                        >
                            <FaGithub className="text-xl" />
                        </a>
                    </div>
                </div>
            )}
            {!profile && !error && (
                <div className="grid bg-neutral p-4 rounded gap-4 shadow grid-cols-1 md:grid-cols-auto">
                    <Skeleton
                        circle={true}
                        className=" rounded-full"
                        containerClassName="avatar w-28 aspect-square mx-auto my-3"
                        baseColor="#374151"
                        highlightColor="#1f2937"
                    />
                    <div className="text-center md:text-left md:mx-4 my-auto">
                        <Skeleton
                            count={2}
                            baseColor="#374151"
                            borderRadius={0}
                            highlightColor="#1f2937"
                        />
                        <Skeleton
                            circle={true}
                            className=" mt-2 mr-2 border-none"
                            containerClassName="avatar w-14 aspect-square inline-flex "
                            baseColor="#374151"
                            highlightColor="#1f2937"
                        />
                        <Skeleton
                            circle={true}
                            className=" mt-2 mr-2 border-none"
                            containerClassName="avatar w-14 aspect-square inline-flex"
                            baseColor="#374151"
                            highlightColor="#1f2937"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default User;
