import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Download } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">RedCross Dashboard</h2>
      <div className="flex items-center space-x-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Jan 20, 2023 - Feb 09, 2023
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={new Date(2023, 0)}
            />
          </PopoverContent>
        </Popover>
        <Button className="bg-gradient-to-r from-[#4169e1] to-[#9333ea] ">
          <Download className="mr-2 h-4 w-4 text-white" />
          <p className="text-white p-0 m-0"> Download</p>
        </Button>
      </div>
    </div>
  );
}
