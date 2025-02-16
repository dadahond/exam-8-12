import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

function MainLayout() {
  return (
    <div className="lg:flex dark:bg-midnightBlack">
      <SideBar />
      <main className="w-full bg-lightMist dark:bg-midnightBlack">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
