import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Test() {
  return (
    <section className="flex flex-col items-center justify-center h-full w-full  bg-radial">
      <div className="rounded-2xl w-80 border-1 border-amber-500 shadow-md shadow-amber-400 hover:shadow-white hover:border-white">
        <div className="w-full rounded-2xl pt-6 bg-black">
          <Image
            src="/Logo.jpg"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto "
          />
        </div>
        <div className="px-6 pb-6 flex flex-col items-center ">
          <input
            type="email"
            placeholder="Nume de utilizator"
            className="w-full bg-white p-2 mt-4 text-center border-2 border-black rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="password"
            placeholder="Parola"
            className="w-full bg-white p-2 mt-6 text-center border-2 border-black rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Link href={"/admin"} className="w-2/3">
            <button className="w-full p-2 mt-6 text-black  bg-white hover:bg-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500">
              Conecteaza-te
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
