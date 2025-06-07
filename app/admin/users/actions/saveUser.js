"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function saveUser(formData) {
  const id = formData.get("id");
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) return;

  const existingUser = await prisma.user.findUnique({ where: { username } });

  if (!id && existingUser) {
    throw new Error("Username deja folosit");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (id) {
    await prisma.user.update({
      where: { id: Number(id) },
      data: { username, password: hashedPassword },
    });
  } else {
    await prisma.user.create({
      data: { username, password: hashedPassword },
    });
  }

  revalidatePath("/admin/users");
}
