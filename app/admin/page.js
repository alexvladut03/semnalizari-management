import React from "react";
import SideBar from "./_components/SideBar";
import DashboardPage from "./_components/DashboardPage";
export default function page() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <SideBar />
      <DashboardPage />
    </div>
  );
}
