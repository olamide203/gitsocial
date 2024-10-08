import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DashboardLayout from "./routes/dashboard/layout";
import PublicRoutes from "./components/PublicRoutes";
import Root from "./routes/root";
import Dashboard from "./routes/dashboard";
import Signup from "./routes/signup";
import NotFound from "./routes/not-found";
import LandingPage from "./routes/landing-page";
import ReRouter from "./components/ReRouter";
import Repositories from "./routes/repositories";
import Following from "./routes/following";
import Followers from "./routes/followers";
import Search from "./routes/search";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "repos",
            element: <ReRouter path="repos" defaultRoute="personal" />,
            children: [
              {
                path: "personal",
                element: <Repositories type="repos" />,
              },
              {
                path: "starred",
                element: <Repositories type="starred" />,
              },
            ],
          },
          {
            path: "people",
            element: <ReRouter path="people" defaultRoute="followers" />,
            children: [
              {
                path: "following",
                element: <Following />,
              },
              {
                path: "followers",
                element: <Followers />,
              },
            ],
          },
          {
            path: "search",
            element: <Search />,
          },
        ],
      },
      {
        element: <PublicRoutes />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "login",
            element: <Signup />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
