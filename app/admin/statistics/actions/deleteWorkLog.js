// app/admin/statistics/actions/deleteWorkLog.js
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteWorkLog(id) {
  try {
    await prisma.workLog.delete({
      where: { id: Number(id) },
    });

    revalidatePath("/admin/statistics");
  } catch (err) {
    throw new Error("Eroare la ștergere");
  }
}
