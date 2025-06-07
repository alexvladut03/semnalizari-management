import React from "react";
import { products } from "@/app/data/data";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
export default function TableProducts() {
  return (
    <div className="border-2 border-gray-500  rounded-lg">
      <div className="grid grid-cols-6 justify-between bg-gray-900/80 hover:bg-gray-950/10 rounded-t-lg p-2 w-full">
        <span className="text-lg font-semibold text-white">Nr</span>
        <span className="text-lg font-semibold text-white col-span-2">
          Nume
        </span>
        <span className="text-lg font-semibold text-white">Poza</span>
        <span className="text-lg font-semibold text-white">Pret Minim</span>
        <span className="text-lg font-semibold text-white">Actiuni</span>
      </div>

      <div>
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <div
              key={product.nr}
              className={`grid grid-cols-6 items-center justify-between bg-gray-600/50 hover:bg-gray-800/80 p-4 w-full border-t-2 border-gray-500 ${
                isLast ? "rounded-b-lg" : ""
              }`}
            >
              <span className="text-lg text-white">{product.nr}</span>
              <span className="text-lg text-white col-span-2 hover:text-amber-500">
                {product.name}
              </span>
              <img
                src={product.photo}
                alt={product.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-lg text-white hover:text-amber-500">
                {product.price.toFixed(2)} RON
              </span>
              <div className="flex items-center gap-4">
                <MdDeleteForever className="text-2xl text-red-500 hover:text-red-700" />
                <MdModeEdit className="text-2xl text-blue-500 hover:text-blue-700" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
