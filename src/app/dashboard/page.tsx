"use client";
import React from "react";
import { Header } from "@/components/ui/navbar";
import { DashboardHeader } from "@/components/dashboard-header";
import { AuroraBackground } from "@/components/ui/aurora-background";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/overview";
import { SpendingChart } from "@/components/spending-chart";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DashboardPageProps {
  params: Promise<{
    charityId: string;
  }>;
}

const mockCardsData = [
  {
    title: "Top Donation",
    value: "$1,200.00",
    change: "+10%",
    period: "from last month",
    icon: DollarSign,
    isPositive: true,
  },
  {
    title: "Total Donations Value",
    value: "$8,540.00",
    change: "+23%",
    period: "from last month",
    icon: Users,
    isPositive: true,
  },
  {
    title: "Total Donations",
    value: "156",
    change: "+17%",
    period: "from last month",
    icon: CreditCard,
    isPositive: true,
  },
  {
    title: "Contributors",
    value: "78",
    change: "+6%",
    period: "since last hour",
    icon: Activity,
    isPositive: true,
  },
];

const mockRecentSales = [
  { name: "Anonymous", amount: "$100.00" },
  { name: "Alice Johnson", amount: "$250.00" },
  { name: "Bob Smith", amount: "$100.00" },
  { name: "Charlie Baker", amount: "$320.00" },
  { name: "Dana Rose", amount: "$85.00" },
  { name: "Eli Turner", amount: "$150.00" },
];

const DashboardPage: React.FC<DashboardPageProps> = ({ params }) => {
  const [resolvedParams, setResolvedParams] = React.useState<{
    charityId: string;
  } | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />
      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <AuroraBackground>
            <div className="flex-1 space-y-4 p-8 pt-6 w-full text-white">
              <DashboardHeader />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {mockCardsData.map((card, index) => (
                  <Card
                    key={index}
                    className="backdrop-blur-md bg-white/10 border-white/20"
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-lg font-medium">
                        {card.title}
                      </CardTitle>
                      <card.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pt-1">
                      <div
                        className={`text-2xl font-bold ${
                          card.isPositive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {card.value}
                      </div>
                      <div className="flex items-center space-x-1 text-xs">
                        <span
                          className={
                            card.isPositive ? "text-green-500" : "text-red-500"
                          }
                        >
                          {card.change}
                        </span>
                        {card.isPositive ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className="text-muted-foreground">
                          {card.period}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-between gap-4 flex-wrap">
                <Overview className="col-span-5 flex-1" />

                <div className="col-span-2 w-full max-w-sm space-y-4">
                  <h2 className="text-lg font-semibold">Recent Donations</h2>
                  {mockRecentSales.map((sale, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-white/10 rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {sale.name
                              .split(" ")
                              .map((w) => w.charAt(0))
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium text-white">
                          {sale.name}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-green-400">
                        {sale.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <SpendingChart />
              </div>
            </div>
          </AuroraBackground>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
