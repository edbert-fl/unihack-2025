import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardTabs } from "@/components/dashboard-tabs";
import { DashboardCards } from "@/components/dashboard-cards";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DashboardHeader />
        <DashboardTabs />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCards />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Overview className="col-span-5" />
          <RecentSales className="col-span-2" />
        </div>
      </div>
    </>
  );
}
