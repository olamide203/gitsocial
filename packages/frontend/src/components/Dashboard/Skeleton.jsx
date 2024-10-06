import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default () => {
    return (
        <div className="overflow-y-scroll">
            <div className="grid grid-cols-auto-fit sm:grid-cols-auto-fit-2 gap-10 p-10 w-full">
                <div className=" grid grid-cols-1 sm:grid-cols-auto gap-x-4 bg-neutral rounded-xl items-center justify-center self-center justify-self-center max-w-[32rem] h-full lg:justify-self-end w-full p-5">
                    <Skeleton
                        circle={true}
                        className=" rounded-full"
                        containerClassName="avatar w-28 aspect-square mx-auto my-3"
                        baseColor="#374151"
                        highlightColor="#1f2937"
                    />
                    <div className="text-center sm:text-left md:mx-4">
                        <Skeleton
                            count={3}
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
                            containerClassName="avatar w-14 aspect-square inline-flex "
                            baseColor="#374151"
                            highlightColor="#1f2937"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 items-center justify-center self-center justify-self-center gap-4 max-w-[32rem] h-full lg:justify-self-start w-full">
                    {[...Array(5)].map((item, index) => (
                        <div
                            className="h-28 grid bg-neutral grid-cols-auto p-3 rounded-2xl shadow-xl hover:bg-gray-800 cursor-pointer"
                            key={index}
                        >
                            <Skeleton
                                count={1}
                                baseColor="#374151"
                                borderRadius={0}
                                highlightColor="#1f2937"
                                containerClassName="col-span-2"
                            />
                            <Skeleton
                                circle={true}
                                className=" mt-2 mr-2 border-none"
                                containerClassName="avatar w-14 aspect-square inline-flex "
                                baseColor="#374151"
                                highlightColor="#1f2937"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
