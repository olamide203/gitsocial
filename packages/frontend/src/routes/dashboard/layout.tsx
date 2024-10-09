import { Outlet, Navigate } from "react-router-dom";
import {
  Provider as ToastProvider,
  Viewport as ToastViewport,
} from "@radix-ui/react-toast";
import Sidebar from "~/components/Sidebar/Sidebar";
import { SearchProvider } from "~/context/SearchContext";

const DashboardLayout = () => {
  return (
    <ToastProvider swipeDirection="right">
      <SearchProvider>
        <div className="grid grid-cols-auto relative mt-16">
          <>
            <Sidebar />
            <Outlet />
          </>
        </div>
      </SearchProvider>
      <ToastViewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-4 w-[400px] m-0 list-none z-[99999] outline-none" />
    </ToastProvider>
  );
};

export default DashboardLayout;
