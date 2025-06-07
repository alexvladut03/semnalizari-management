"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ field: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ field: "", message: "" });

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/admin",
    });

    if (res.error === "invalid-username") {
      setError({ field: "username", message: "Username-ul este greșit" });
    } else if (res.error === "invalid-password") {
      setError({ field: "password", message: "Parola este greșită" });
    } else {
      window.location.href = "/admin";
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-full w-full bg-radial">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl w-80 border-1 border-amber-500 shadow-md shadow-amber-400 hover:shadow-white hover:border-white"
      >
        <div className="w-full rounded-2xl pt-6 bg-black">
          <Image
            src="/Logo.jpg"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
        <div className="px-6 pb-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nume de utilizator"
            className="w-full bg-white p-2 mt-4 text-center border-2 border-black rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error.field === "username" && (
            <div className="text-red-500 text-sm mt-1 ml-1 absolute">
              {error.message}
            </div>
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parola"
            className="w-full bg-white p-2 mt-7 text-center border-2 border-black rounded-lg placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          {error.field === "password" && (
            <p className="text-red-500 text-sm mt-1 ml-1 absolute">
              {error.message}
            </p>
          )}
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="w-2/3 p-2 mt-8 text-black bg-white hover:bg-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              Conectează-te
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
