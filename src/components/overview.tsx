import type React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const data = [
  { name: "Jan", total: 5300 },
  { name: "Feb", total: 1200 },
  { name: "Mar", total: 1500 },
  { name: "Apr", total: 4500 },
  { name: "May", total: 5000 },
  { name: "Jun", total: 3800 },
  { name: "Jul", total: 2200 },
  { name: "Aug", total: 3100 },
  { name: "Sep", total: 5200 },
  { name: "Oct", total: 4800 },
  { name: "Nov", total: 1800 },
  { name: "Dec", total: 3500 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (active) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
  }, [active]);

  if (active && payload && payload.length) {
    return (
      <div
        className="backdrop-blur-md bg-white/20 border border-white/30 rounded-lg p-2 "
        style={{
          transition: "all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)",
          opacity,
          transform: `translateY(${opacity ? 0 : 10}px)`,
        }}
      >
        <p className="text-white font-medium">{`${label}`}</p>
        <p className="text-white font-bold">{`$${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export function Overview({ className }: React.ComponentProps<"div">) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [chartOpacity, setChartOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartOpacity(1);
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <div
      className={className}
      style={{
        transition: "opacity 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        opacity: chartOpacity,
      }}
    >
      <ResponsiveContainer
        width="100%"
        height={500}
        className="backdrop-blur-md bg-white/10 border-white/20 border rounded-xl pt-4 w-max h-max overflow-visible"
      >
        <BarChart
          data={data}
          barGap={4}
          barSize={55}
          onMouseMove={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.65)" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
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
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
          />
          <Bar
            dataKey="total"
            radius={[10, 10, 0, 0]}
            isAnimationActive={true}
            animationDuration={2000}
            animationEasing="ease-in-out"
            fill="url(#barGradient)"
            filter="url(#softGlow)"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                filter={activeIndex === index ? "url(#glow)" : "url(#softGlow)"}
                style={{
                  visibility: "hidden",
                  opacity: 0,
                  animation: `growUp 1.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards ${
                    0.3 + index * 0.1
                  }s`,
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <style jsx global>{`
        @keyframes growUp {
          0% {
            height: 0;
            opacity: 0;
            visibility: hidden;
          }
          100% {
            height: 100%;
            opacity: 1;
            visibility: visible;
          }
        }

        @keyframes gentlePulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.75;
          }
          100% {
            opacity: 1;
          }
        }

        .recharts-bar-rectangle:hover {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: translateY(-7px);
        }
      `}</style>
    </div>
  );
}
