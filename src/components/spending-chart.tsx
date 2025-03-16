"use client";

import type React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample data for spending categories
const data = [
  { name: "Marketing", value: 12500, color: "#8884d8" },
  { name: "Operations", value: 18000, color: "#82ca9d" },
  { name: "Product Development", value: 25000, color: "#ffc658" },
  { name: "Customer Support", value: 8000, color: "#ff8042" },
  { name: "Infrastructure", value: 15000, color: "#0088fe" },
];

// Function to randomize data values within a range
const randomizeData = (data: { value: number, color: string }[]) => {
  return data.map((item) => ({
    ...item,
    value: Math.floor(Math.random() * (item.value * 0.2) + item.value * 0.8), // Randomize within ±20% of the original value
  }));
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-sm p-2 text-sm">
        <p className="font-medium">{`${payload[0].name}`}</p>
        <p className="text-muted-foreground">{`$${payload[0].value.toLocaleString()}`}</p>
        <p className="text-xs text-muted-foreground">{`${(
          payload[0].payload.percent * 100
        ).toFixed(1)}%`}</p>
      </div>
    );
  }
  return null;
};

// Calculate percentages for each segment
const total = data.reduce((sum, entry) => sum + entry.value, 0);
const dataWithPercent = randomizeData(data).map((item) => ({
  ...item,
  percent: item.value / total,
}));

interface SpendingChartProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SpendingChart({ className, ...props }: SpendingChartProps) {
  return (
    <Card
      className={className + " backdrop-blur-md bg-white/10 border-white/20"}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-3xl">Spending Allocation</CardTitle>
        <CardDescription className="text-xl">
          Breakdown of where the total budget is allocated
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%" aspect={undefined}>
            <PieChart>
              <Pie
                data={dataWithPercent}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                innerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {dataWithPercent.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
