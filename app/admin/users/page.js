import React from "react";
import SideBar from "../_components/SideBar";

import TableUsers from "./_components/TableUsers";
import UserDialogForm from "./_components/UserDialogForm";
import { saveUser } from "./actions/saveUser";

export default function page() {
  return (
    <div className="ml-[25%] h-screen overflow-y-auto bg-linear from-slate-800 to-slate-900 text-white p-4">
      <SideBar />
      <h1 className="flex justify-center items-center h-[74px] text-3xl font-bold pb-4 border-b border-amber-500">
        Utilizatori
      </h1>
      <div className="flex justify-end w-full">
        <UserDialogForm
          mode="create"
          action={saveUser}
          trigger={
            <button className="my-4 bg-gray-500/70 hover:bg-gray-400/90 text-white py-2 px-4 rounded">
              Adaugă produs
            </button>
          }
        />
      </div>

      <TableUsers />
    </div>
  );
}
