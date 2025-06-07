"use client";

import { useState } from "react";
import { editUser } from "../actions/editUser";

export default function EditUserForm({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>✏️</button>

      {open && (
        <form
          action={async (formData) => {
            await editUser(formData);
            setOpen(false);
          }}
          className="flex flex-col gap-2 mt-2"
        >
          <input type="hidden" name="id" value={user.id} />
          <input
            type="text"
            name="username"
            defaultValue={user.username}
            placeholder="Username nou"
            className="border px-2 py-1 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Parolă nouă (opțional)"
            className="border px-2 py-1 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Salvează
          </button>
        </form>
      )}
    </div>
  );
}
