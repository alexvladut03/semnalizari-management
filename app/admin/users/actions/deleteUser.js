"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(formData) {
  const id = Number(formData.get("id"));
  if (!id || isNaN(id)) return;

  // Ștergi întâi workLog-urile userului
  await prisma.workLog.deleteMany({
    where: { userId: id },
  });

  // Apoi ștergi userul
  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}
