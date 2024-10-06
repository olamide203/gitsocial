import React from "react";
import Card from "../components/UI/Card";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <Card>
            <div className="bg-[url(/images/not-found-left.svg)] bg-cover sm:bg-contain bg-left-top bg-no-repeat absolute w-4/5 h-full -left-20  sm:-left-10 -top-2"></div>
            <div className="text-white grid  self-start sm:self-center justify-center items-center z-10">
                <h1 className="text-7xl sm:text-9xl mx-auto py-4">404</h1>
                <p className="uppercase mx-auto font-bold">
                    {" "}
                    sorry! page not found
                </p>
                <button
                    className="py-2 cursor-pointer px-8 rounded-lg uppercase font-medium shadow-md bg-blue-600 hover:bg-blue-400 active:bg-blue-600 active:scale-95 transition-all mx-auto mt-40 sm:my-4"
                    onClick={() => {
                        // navigate("/");
                    }}
                >
                    home
                </button>
            </div>
            <div className="bg-[url(/images/not-found-right.svg)] bg-cover sm:bg-contain bg-right-top bg-no-repeat absolute w-4/5 h-full -right-20 sm:-right-10 -top-2"></div>
        </Card>
    );
}

export default NotFound;
