"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  type TooltipProps,
} from "recharts";
import { useState, useEffect } from "react";

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
  // State to control the animation sequence
  const [showETH, setShowETH] = useState(false);
  const [showBTC, setShowBTC] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [animatedData, setAnimatedData] = useState<typeof data>([]);

  // Animation sequence on component mount
  useEffect(() => {
    // First show the grid
    setTimeout(() => {
      setShowGrid(true);
    }, 300);

    // Then gradually populate the data
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 500);

    // Then show ETH bars
    setTimeout(() => {
      setShowETH(true);
    }, 800);

    // Finally show BTC bars
    setTimeout(() => {
      setShowBTC(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

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
            <BarChart
              data={animatedData}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: 5,
              }}
              barGap={8}
              barCategoryGap={16}
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
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(136, 136, 136, 0.2)"
                />
              )}
              <Tooltip
                content={<CustomTooltip />}
                animationDuration={300}
                animationEasing="ease-out"
              />
              <Legend
                wrapperStyle={{ paddingTop: 10 }}
                iconType="circle"
                iconSize={8}
              />
              {showETH && (
                <Bar
                  dataKey="ETH"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.8}
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  radius={[4, 4, 0, 0]}
                />
              )}
              {showBTC && (
                <Bar
                  dataKey="BTC"
                  fill="hsl(var(--secondary))"
                  fillOpacity={0.8}
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  animationBegin={300}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
