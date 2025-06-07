import React from "react";
import SideBar from "../_components/SideBar";
import UserRegister from "./_components/UserRegister";
import TableUsers from "./_components/TableUsers";

export default function page() {
  return (
    <div className="ml-[25%] h-screen overflow-y-auto bg-linear from-slate-800 to-slate-900 text-white p-4">
      <SideBar />
      <UserRegister />
      <TableUsers />
    </div>
  );
}
