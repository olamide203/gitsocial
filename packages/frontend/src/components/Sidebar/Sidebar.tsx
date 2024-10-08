import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import items from "../../data/sidebar.json";
import SidebarItem from "./SidebarItem";
import useWindowSize from "../../Hooks/useWindowSize";
import useDebounce from "../../Hooks/useDebounce";

function Sidebar() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [width, height] = useWindowSize();
  const debouncedWidth = useDebounce(width, 1000);
  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };
  useEffect(() => {
    if (debouncedWidth <= 640 && debouncedWidth > 0) {
      setSidebarExpanded(false);
    }
  }, [debouncedWidth]);
  return (
    <div
      className={`side-bar relative min-h-screen h-full ${
        sidebarExpanded ? "w-52" : "w-20"
      } m-0 flex flex-col bg-neutral text-white shadow-xl transition-all duration-300`}
    >
      {width > 640 && (
        <button
          className=" grid content-center justify-center  w-10 h-10 p-2 absolute -right-5 top-4 bg-gray-800 text-white hover:bg-white hover:text-gray-800 rounded-3xl cursor-pointer"
          onClick={toggleSidebar}
        >
          {!sidebarExpanded && <IoIosArrowForward />}
          {sidebarExpanded && <IoIosArrowBack />}
        </button>
      )}
      <div className="mt-16 transition-all py-5">
        {items.map((item, index) => (
          <SidebarItem
            item={item}
            key={index}
            sidebarExpanded={sidebarExpanded}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
