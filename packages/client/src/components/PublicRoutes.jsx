import React from "react";
import { Outlet } from "react-router-dom";

function PublicRoutes() {
    return (
        <div className="relative mt-16">
            <Outlet />
        </div>
    );
}

export default PublicRoutes;
