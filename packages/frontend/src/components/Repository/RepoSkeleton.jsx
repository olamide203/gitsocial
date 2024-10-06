import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function RepoSkeleton() {
    return (
        <div className="grid bg-neutral p-4 rounded gap-4 shadow">
            <Skeleton
                count={4}
                baseColor="#374151"
                borderRadius={0}
                highlightColor="#1f2937"
            />
            <div>
                <Skeleton
                    circle={true}
                    className=" mt-2 mr-2 border-none"
                    containerClassName="avatar w-14 aspect-square inline-flex"
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
            <div className="grid items-end">
                <div className="grid grid-flow-col grid-cols-auto items-center">
                    <Skeleton
                        circle={true}
                        className=" mt-2 mr-2 border-none"
                        containerClassName="avatar w-8 aspect-square inline-flex"
                        baseColor="#374151"
                        highlightColor="#1f2937"
                    />
                    <Skeleton
                        count={1}
                        baseColor="#374151"
                        borderRadius={0}
                        highlightColor="#1f2937"
                    />
                </div>
            </div>
        </div>
    );
}

export default RepoSkeleton;
