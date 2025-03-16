"use client";

import { Header } from '@/components/ui/navbar';
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { DashboardCards } from "@/components/dashboard-cards";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { SpendingChart } from "@/components/spending-chart";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />
      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <AuroraBackground>
            <div className="flex-1 space-y-4 p-8 pt-6 w-full text-white">
              <DashboardHeader />
              <DashboardTabs />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCards  />
              </div>
              <div className="flex justify-between gap-4">
                <Overview className="col-span-5 flex-1" />
                <RecentSales className="col-span-2" />
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
}
