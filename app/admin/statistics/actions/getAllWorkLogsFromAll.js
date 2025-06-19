"use server";

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function getAllWorkLogsFromAll() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    console.warn("Utilizator neautentificat");
    return [];
  }

  const workLogs = await prisma.workLog.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return workLogs;
}
