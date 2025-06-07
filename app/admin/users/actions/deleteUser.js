"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(formData) {
  const id = formData.get("id");
  if (!id) return;

  // Fără Number(), pentru că e string!
  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}
