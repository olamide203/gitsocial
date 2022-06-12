import React from "react";
import { NavLink } from "react-router-dom";

function Avatar({ imageURL }) {
    return (
        <div className="avatar dropdown dropdown-end  relative ">
            <div className="w-12 rounded-full cursor-pointer" tabIndex="0">
                <img
                    src={imageURL}
                    alt=""
                    className="btn btn-ghost btn-circle"
                />
            </div>
            <ul
                tabIndex="0"
                className="dropdown-content menu p-2 my-4 bg-gray-700 rounded-lg z-50 shadow-lg w-52 relative before:absolute before:w-4 before:h-4 before:z-0 before:bg-gray-700 before:-top-2 before:right-4 before:rotate-45"
            >
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `my-1 ${isActive ? "bg-gray-800" : ""}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <a
                        href="http://localhost:5000/api/v1/auth/logout"
                        className="btn-ghost"
                    >
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Avatar;
