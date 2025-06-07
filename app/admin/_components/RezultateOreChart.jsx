"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
const chartData = [
  { month: "Sande", ore: 60 },
  { month: "Vlad", ore: 40 },
  { month: "Mocanu", ore: 45 },
  { month: "Alin", ore: 20 },
  { month: "Yani", ore: 10 },
];
const chartConfig = {
  desktop: {
    label: "Total Ore",
    color: "#fd9a00",
  },
};
export default function RezultateOreChart() {
  return (
    <div>
      <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#fff" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fill: "#fff" }} axisLine={false} tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="ore" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
