"use client";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg"
    >
      Logout
    </button>
  );
}
