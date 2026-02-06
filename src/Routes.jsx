import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepo from "./components/repo/CreateRepo";

import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const publicRoutes = ["/auth", "/signup"];

    if (userId && !currentUser) setCurrentUser(userId);

    if (!userId && !publicRoutes.includes(window.location.pathname)) {
      navigate("/auth");
    }

    if (userId && window.location.pathname === "/auth") {
      navigate("/");
    }
  }, [currentUser, setCurrentUser, navigate]);

  let element = useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/auth", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/profile", element: <Profile /> },
    { path: "/create-repo", element: <CreateRepo /> },
  ]);

  return element;
};

export default ProjectRoutes;
