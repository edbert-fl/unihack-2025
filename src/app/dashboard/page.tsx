import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { DashboardCards } from "@/components/dashboard-cards";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { SpendingChart } from "@/components/spending-chart";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function DashboardPage() {
  return (
    <AuroraBackground>
      <div className="flex-1 space-y-4 p-8 pt-6 w-full text-white">
        <DashboardHeader />
        <DashboardTabs />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCards />
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
  );
}
