import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import LandingPage from "../pages/LandingPage";
import ReRouter from "./ReRouter";
import Repositories from "../pages/Repositories";
import Following from "../pages/Following";
import Followers from "../pages/Followers";
import Search from "../pages/Search";

function MainRouter() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="repos"
                element={<ReRouter path="repos" defaultRoute="personal" />}
              >
                <Route
                  path="personal"
                  element={<Repositories type="repos" />}
                />
                <Route
                  path="starred"
                  element={<Repositories type="starred" />}
                />
              </Route>
              <Route
                path="people"
                element={<ReRouter path="people" defaultRoute="followers" />}
              >
                <Route path="following" element={<Following />} />
                <Route path="followers" element={<Followers />} />
              </Route>
              <Route path="search" element={<Search />} />
            </Route>
            <Route path="/" element={<PublicRoutes />}>
              <Route index element={<LandingPage />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Signup />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

export default MainRouter;
