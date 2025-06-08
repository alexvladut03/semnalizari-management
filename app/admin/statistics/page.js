import React from "react";
import SideBar from "../_components/SideBar";
import AddWorkDialog from "./_components/AddWorkDialog";
import RezultateOreChart from "./_components/RezultateOreChart";
import { saveWorkLog } from "./actions/saveWorkLog";
import { getWorkLogsForChart } from "./actions/getWorkLogsForChart";

export default async function page() {
  const chartData = await getWorkLogsForChart();

  return (
    <div className="ml-[25%] h-screen overflow-y-auto bg-linear from-slate-800 to-slate-900 text-white p-4">
      <SideBar />
      <h1 className="flex justify-center items-center h-[74px] text-3xl font-bold pb-4 border-b border-amber-500">
        Statistici
      </h1>
      <div className="flex justify-end w-full">
        <AddWorkDialog
          trigger={
            <button className="my-4 bg-gray-500/70 hover:bg-gray-400/90 text-white py-2 px-4 rounded">
              Adaugă Ore de Muncă
            </button>
          }
          action={saveWorkLog}
        />
      </div>
      <RezultateOreChart data={chartData} />
    </div>
  );
}
