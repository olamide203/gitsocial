import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import Icons from "./icons";
import SidebarIcon from "./SidebarIcon";

const SidebarItem = ({ item, sidebarExpanded }) => {
  const Icon = Icons[item.icon];
  const [isExpanded, setIsExpanded] = useState(false);
  // toggle sidebar item
  const toggleMenu = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <>
      {sidebarExpanded && !item.children && (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "bg-sky-700" : ""}`
          }
        >
          <Icon className="inline text-xl" />
          <span className="justify-self-start self-center text-sm font-semibold capitalize whitespace-nowrap">
            {item.title}
          </span>
        </NavLink>
      )}
      {sidebarExpanded && item.children && (
        <div className="sidebar-items">
          <div
            className="sidebar-item  capitalize rounded-none text-left"
            onClick={toggleMenu}
          >
            <Icon className="inline text-lg" />
            {item.title}
            <ChevronUpIcon
              className={`inline text-xl ${
                !isExpanded ? "rotate-180" : ""
              } transition-transform duration-500`}
            />
          </div>
          <div className={`pl-4 ${isExpanded ? "block" : "hidden"}`}>
            {item.children.map((item, index) => (
              <SidebarItem
                item={item}
                sidebarExpanded={sidebarExpanded}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
      {!sidebarExpanded && (
        <div className="relative grid grid-cols-1 items-center justify-center w-12 mt-2 mb-2 mx-auto">
          <SidebarIcon
            item={item}
            isExpanded={isExpanded}
            toggleMenu={toggleMenu}
          />
        </div>
      )}
    </>
  );
};

export default SidebarItem;
