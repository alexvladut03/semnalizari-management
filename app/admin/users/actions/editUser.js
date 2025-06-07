"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function editUser(formData) {
  const id = Number(formData.get("id"));
  const username = formData.get("username");
  const password = formData.get("password");

  if (!id || isNaN(id)) return;

  const dataToUpdate = {};

  if (username) dataToUpdate.username = username;
  if (password) dataToUpdate.password = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin/users");
}
