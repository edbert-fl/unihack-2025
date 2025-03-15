"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  type TooltipProps,
} from "recharts";

const data = [
  { month: "Jan", ETH: 4, BTC: 2.4 },
  { month: "Feb", ETH: 3, BTC: 1.8 },
  { month: "Mar", ETH: 5, BTC: 3.2 },
  { month: "Apr", ETH: 7.5, BTC: 4.5 },
  { month: "May", ETH: 6, BTC: 3.6 },
  { month: "Jun", ETH: 9, BTC: 5.4 },
  { month: "Jul", ETH: 11, BTC: 6.6 },
  { month: "Aug", ETH: 13, BTC: 7.8 },
  { month: "Sep", ETH: 15, BTC: 9 },
  { month: "Oct", ETH: 18, BTC: 10.8 },
  { month: "Nov", ETH: 22, BTC: 13.2 },
  { month: "Dec", ETH: 25, BTC: 15 },
];

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Month
            </span>
            <span className="font-bold text-foreground">{label}</span>
          </div>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {entry.dataKey}
              </span>
              <span className="font-bold" style={{ color: entry.color }}>
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export function DonationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Overview</CardTitle>
        <CardDescription>
          Monthly donation volume in ETH and BTC
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="#888888"
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="#888888"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="ETH"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="BTC"
                stackId="2"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
