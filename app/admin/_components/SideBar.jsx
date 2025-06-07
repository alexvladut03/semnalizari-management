import Image from "next/image";
import React from "react";
import LogOutButton from "./LogOutButton";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-1/4 border-r-2 border-amber-500 bg-gradient-to-b from-black to-gray-700 p-4 z-10">
      <Image
        src="/logo.jpg"
        alt="Logo"
        width={80}
        height={80}
        className="mx-auto"
      />

      <div className="border-t border-amber-500 mt-4 pt-2">
        <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg">
          <Link href="/admin">Dashboard</Link>
        </button>
        <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg">
          <Link href="/admin/users">Users</Link>
        </button>
      </div>
      <LogOutButton />
    </div>
  );
}
