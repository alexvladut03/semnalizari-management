"use server";

import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/authOptions";

export async function saveWorkLog(formData) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Trebuie să fii autentificat.");
  }

  const hours = Number(formData.get("hours")) || 0;
  const minutes = Number(formData.get("minutes"));
  const reason = formData.get("reason")?.toString().trim();

  if (!reason || isNaN(minutes) || minutes < 0 || minutes > 59) {
    throw new Error("Date invalide");
  }

  const totalMinutes = hours * 60 + minutes;

  await prisma.workLog.create({
    data: {
      userId,
      reason,
      minutes: totalMinutes,
    },
  });
  console.log("✅ Logging work for:", { userId, hours, minutes, reason });
  revalidatePath("/admin/statistics");
}
