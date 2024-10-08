import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import Icons from "./icons";
import Tooltip from "../Tooltip";

const SidebarIcon = ({ item, isExpanded, toggleMenu }) => {
    const Icon = Icons[item.icon];
    if (item.children) {
        return (
            <div className="sidebar-icons">
                <Tooltip
                    element={
                        <div
                            className=" btn btn-sm btn-circle w-10 h-10 my-1 mx-auto"
                            onClick={toggleMenu}
                        >
                            <Icon className="inline text-lg" />
                            <ChevronUpIcon
                                className={`inline text-xs ${
                                    !isExpanded ? "-rotate-180" : ""
                                } transition-transform duration-500`}
                            />
                        </div>
                    }
                    tip={item.title}
                    side="right"
                    sideOffset={3}
                />
                <div className={`${isExpanded ? "block" : "hidden"}`}>
                    {item.children.map((item, index) => (
                        <div
                            className="w-9 h-9 mb-2 self-center justify-self-center"
                            key={index}
                        >
                            <SidebarIcon item={item} />
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <NavLink
                to={item.path}
                className={({ isActive }) =>
                    `sidebar-icon ${isActive ? "bg-sky-700" : ""}`
                }
            >
                <Tooltip
                    element={
                        <div className="px-2 aspect-square grid justify-center items-center ">
                            <Icon className="inline text-xl w-full" />
                        </div>
                    }
                    tip={item.title}
                    side="right"
                    sideOffset={8}
                />
            </NavLink>
        );
    }
};

export default SidebarIcon;
