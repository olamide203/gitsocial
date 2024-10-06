import React from "react";

function Card({ children }) {
    return (
        <div className="grid self-center justify-self-center  justify-center items-center bg-neutral relative p-4 h-4/5 sm:h-3/5 w-4/5 sm:max-w-lg rounded-2xl shadow-2xl">
            {children}
        </div>
    );
}

export default Card;
