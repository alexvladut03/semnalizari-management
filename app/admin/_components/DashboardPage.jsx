import CustomPagination from "./CustomPagination";
import TableProducts from "./TableProducts";

export default function DashboardPage() {
  return (
    <div className="ml-[25%] h-screen overflow-y-auto bg-linear from-slate-800 to-slate-900 text-white p-4">
      <h1 className="flex justify-center items-center h-[74px] text-3xl font-bold pb-4 border-b border-amber-500">
        Toate produsele
      </h1>
      <div className="flex justify-end w-full">
        <button className="my-4 bg-gray-500/70 hover:bg-gray-400/90 text-white py-2 px-4 rounded">
          Adaugă produs
        </button>
      </div>
      <div>
        <TableProducts />
        <CustomPagination />
      </div>
    </div>
  );
}
