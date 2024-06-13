import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Topnav from "./Topnav";
import Sidenav from "./Sidenav";

function Layout() {
  const navigate = useNavigate();

  const { auth } = useAuth();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [auth, navigate]);
  if (!auth.isAuthenticated) return <></>;
  return (
    <div className="flex">
      <Sidenav />
      <div className="flex flex-col flex-1">
        <Topnav />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
