"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface barData {
  name: String;
  total: number;
}

const data: barData[] = [
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
  const [charity, setCharity] = useState<any>();

  useEffect(() => {
    const barDataFetch = async (charityId: string) => {
      try {
        const resp = await fetch(`/api/charities/${charityId}`);
        return resp.json();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      const charities = await barDataFetch("x");
      setCharity(charities);
    };

    fetchData();
  }, []);

  return (
    <div className={className}>
      <ResponsiveContainer
        width="100%"
        className={
          "backdrop-blur-md bg-white/10 border-white/20 border rounded-xl pt-4 w-max h-max"
        }
      >
        <BarChart data={data} barGap={4} barSize={55}>
          <XAxis
            dataKey="name"
            stroke="#FFFFFF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#FFFFFF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="total" fill="#FFFFFF" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
