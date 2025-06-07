import { MdDeleteForever, MdEdit, MdModeEdit } from "react-icons/md";
import prisma from "@/lib/prisma";
import { deleteUser } from "../actions/deleteUser"; // asigură-te că calea e corectă
import UserDialogForm from "./UserDialogForm";
import { editUser } from "../actions/editUser";

export default async function TableUsers() {
  const users = await prisma.user.findMany();

  return (
    <div className="border-2 border-gray-500 rounded-lg">
      <div className="grid grid-cols-4 bg-gray-900/80 hover:bg-gray-950/10 rounded-t-lg p-2 w-full">
        <span className="text-lg font-semibold text-white">ID</span>
        <span className="text-lg font-semibold text-white">Username</span>
        <span className="text-lg font-semibold text-white">Parolă (hash)</span>
        <span className="text-lg font-semibold text-white">Acțiuni</span>
      </div>

      {users.map((user, index) => {
        const isLast = index === users.length - 1;

        return (
          <div
            key={user.id}
            className={`grid grid-cols-4 items-center bg-gray-600/50 hover:bg-gray-800/80 p-4 border-t-2 border-gray-500 ${
              isLast ? "rounded-b-lg" : ""
            }`}
          >
            <span className="text-white text-sm">{user.id}</span>
            <span className="text-white">{user.username}</span>
            <span className="text-white">
              {"*".repeat(Math.min(user.password.length, 12))}
            </span>
            <div className="flex items-center gap-4">
              <form action={deleteUser}>
                <input type="hidden" name="id" value={user.id} />
                <button type="submit">
                  <MdDeleteForever className="text-2xl text-red-500 hover:text-red-700 cursor-pointer" />
                </button>
              </form>
              <UserDialogForm
                mode="edit"
                user={user}
                action={editUser}
                trigger={
                  <MdEdit className="text-xl text-blue-500 hover:text-blue-700 cursor-pointer" />
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
