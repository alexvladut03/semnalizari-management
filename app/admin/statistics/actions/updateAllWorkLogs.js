"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAllWorkLogs(formData) {
  const logsToUpdate = [];

  for (const [key, value] of formData.entries()) {
    const match = key.match(/(hours|minutes|reason)-(\d+)/);
    if (!match) continue;

    const [, field, id] = match;
    let log = logsToUpdate.find((l) => l.id === id);

    if (!log) {
      log = { id };
      logsToUpdate.push(log);
    }

    log[field] = field === "reason" ? value : Number(value);
  }

  for (const log of logsToUpdate) {
    const totalMinutes = (log.hours || 0) * 60 + (log.minutes || 0);

    await prisma.workLog.update({
      where: { id: Number(log.id) },
      data: {
        minutes: totalMinutes,
        reason: log.reason,
      },
    });
  }

  revalidatePath("/admin/statistics");
}
