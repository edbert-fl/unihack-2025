"use client";

import type React from "react";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: 5300,
  },
  {
    name: "Feb",
    total: 1200,
  },
  {
    name: "Mar",
    total: 1500,
  },
  {
    name: "Apr",
    total: 4500,
  },
  {
    name: "May",
    total: 5000,
  },
  {
    name: "Jun",
    total: 3800,
  },
  {
    name: "Jul",
    total: 2200,
  },
  {
    name: "Aug",
    total: 3100,
  },
  {
    name: "Sep",
    total: 5200,
  },
  {
    name: "Oct",
    total: 4800,
  },
  {
    name: "Nov",
    total: 1800,
  },
  {
    name: "Dec",
    total: 3500,
  },
];

export function Overview({ className }: React.ComponentProps<"div">) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
