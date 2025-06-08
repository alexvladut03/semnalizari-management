"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Total Ore",
    color: "#fd9a00",
  },
};

export default function RezultateOreChart({ data }) {
  console.log("RezultateOreChart data:", data);
  return (
    <div className="w-1/2 mx-auto mt-10">
      <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "#fff" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fill: "#fff" }} axisLine={false} tickLine={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name, item) => {
                  return [
                    <div className="flex flex-col font-medium" key="custom">
                      <span className=" flex items-center gap-2 ">
                        <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                        Total Ore {item.payload.ore}
                      </span>
                    </div>,
                  ];
                }}
              />
            }
          />

          <Bar dataKey="label" fill="var(--color-desktop)" radius={4}></Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
