import { Button } from "@/components/ui/button";
import { CalendarIcon, Download } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">RedCross Dashboard</h2>
      <div className="flex items-center space-x-2">
        <Button className="bg-gradient-to-r from-[#4169e1] to-[#9333ea] ">
          <Download className="mr-2 h-4 w-4 text-white" />
          <p className="text-white p-0 m-0"> Download</p>
        </Button>
      </div>
    </div>
  );
}
