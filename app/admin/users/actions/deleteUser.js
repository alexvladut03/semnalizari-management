"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(formData) {
  const id = Number(formData.get("id")); // conversie importantă
  if (!id || isNaN(id)) return;

  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}
