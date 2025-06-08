export async function getWorkLogsForChart() {
  const workLogs = await prisma.workLog.findMany({
    include: { user: true },
  });

  const totalsByUser = {};

  for (const log of workLogs) {
    const name = log.user.username;
    if (!totalsByUser[name]) {
      totalsByUser[name] = 0;
    }
    totalsByUser[name] += log.minutes;
  }

  return Object.entries(totalsByUser).map(([name, totalMinutes]) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return {
      name,
      ore: `${hours}h ${minutes}m`, // pentru afișare în tooltip sau sub bară
      label: +(totalMinutes / 60).toFixed(2), // valoare numerică reală pentru grafic
    };
  });
}
