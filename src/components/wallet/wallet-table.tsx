"use client";
import WarningIcon from '@/default_images/warning-icon.svg';
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, TriangleAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: string;
  charity: string;
  amount: string;
  currency: string;
  timestamp: string;
  wallet: string;
  impact: string;
  status: string;
  suspicion: string;
}

export function WalletTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortField, setSortField] = useState<keyof Transaction>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Mock data - replace with actual API call
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>; // Random Time Between Each Donation
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        charity: "Save the Children",
        amount: "5.2",
        currency: "ETH",
        timestamp: new Date().toISOString(),
        wallet: "0x1234...",
        impact: "Provided food for 50 children",
        status: "Success",
        suspicion: "Suspicious"
      },
      {
        id: "2",
        charity: "Red Cross",
        amount: "2.8",
        currency: "BTC",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        wallet: "0x8765...",
        impact: "Emergency relief for disaster zone",
        status: "Failed",
        suspicion: ""
      },
      // Add more mock data as needed
    ];

    setTransactions(mockTransactions);
    function getRandomStatus() {
      const randomValue = Math.random();
      if (randomValue < 0.2) {
        return "Failed"
      }
      if (randomValue < 0.4) {
        return "Pending"
      }
      return "Success"
    }    
    function getRandomSuspicion(status: string) {
      const randomValue = Math.random(); // Generates a random number between 0 and 1
      console.log(randomValue)
      if (randomValue < 0.3 && status === "Success") {
        return "Suspicious";  
      } else {
        return ""; 
      }
    }

    // Simulate real-time updates
    const generateTransaction = () => {
      let status = getRandomStatus()
      setTransactions((prev) => {
        const newTransaction: Transaction = {
          id: Math.random().toString(),
          charity: ["Save the Children", "Red Cross", "UNICEF"][
            Math.floor(Math.random() * 3)
          ],
          amount: (Math.random() * 10).toFixed(2),
          currency: ["ETH", "BTC", "USDT"][Math.floor(Math.random() * 3)],
          timestamp: new Date().toISOString(),
          wallet: `0x${Math.random().toString(16).slice(2, 6)}...`,
          impact: "New donation received",
          status: status,
          suspicion: getRandomSuspicion(status),
        };

        return [newTransaction, ...prev];
      });

      // ⏱ Random delay between 2s - 5s
      const nextDelay = 2000 + Math.random() * 10000;
      timeout = setTimeout(generateTransaction, nextDelay);
    };

    generateTransaction();

    return () => clearTimeout(timeout);
  }, []);

  const riskSortOrder = ["", "Suspicious"];

  const compareRisk = (a: string, b: string) => {
    return riskSortOrder.indexOf(a) - riskSortOrder.indexOf(b);
  };


  const sortedTransactions = [...transactions].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Numeric sort for amount
    if (sortField === "amount") {
      const aNum = parseFloat(aValue);
      const bNum = parseFloat(bValue);
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }

    // Timestamp sort
    if (sortField === "timestamp") {
      const aTime = new Date(aValue).getTime();
      const bTime = new Date(bValue).getTime();
      return sortDirection === "asc" ? aTime - bTime : bTime - aTime;
    }

    // Risk sort (custom sorting order)
    if (sortField === "suspicion") {
      const comparison = compareRisk(aValue, bValue);
      return sortDirection === "asc" ? comparison : -comparison;
    }

    // String sort
    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const renderSortIcon = (field: keyof Transaction) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="inline w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="inline w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="rounded-md overflow-auto h-full">
      {" "}
      {/* Fixed height */}
      <Table className="table-fixed">
        <TableHeader className="w-full z-10">
          <TableRow>
            <TableHead
              onClick={() => handleSort("charity")}
              className="cursor-pointer w-[10%] text-[13px] "
            >
              Charity {renderSortIcon("charity")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("amount")}
              className="cursor-pointer w-[11%] text-[13px] "
            >
              Amount {renderSortIcon("amount")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("wallet")}
              className="cursor-pointer w-[10%] text-[13px]"
            >
              Wallet {renderSortIcon("wallet")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("impact")}
              className="cursor-pointer w-[13%] text-[13px] "
            >
              Impact {renderSortIcon("impact")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("timestamp")}
              className="cursor-pointer w-[8%] text-[13px] "
            >
              Time {renderSortIcon("timestamp")}
            </TableHead>
            <TableHead
              className="cursor-pointer w-[9%] text-[13px]"
              onClick={() => handleSort("status")}
            >
              Status {renderSortIcon("status")}
            </TableHead>
            <TableHead
              className=" w-[5%] text-[13px]"
            >
               {renderSortIcon("suspicion")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {sortedTransactions.map((transaction) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
              >
                <TableCell className="font-medium  w-[14%] text-[13px]">
                  {transaction.charity}
                </TableCell>
                <TableCell className="text-[13px]">{transaction.amount} {transaction.currency}</TableCell>
                <TableCell className="font-mono text-[13px]">
                  {transaction.wallet}
                </TableCell>
                <TableCell className="text-[13px]">{transaction.impact}</TableCell>
                <TableCell className="text-[13px]">
                  {new Date(transaction.timestamp).toLocaleTimeString()}
                </TableCell>
                <TableCell className={`font-mono text-[13px] ${
                    transaction.status === "Success"
                      ? "text-green-500"
                      : transaction.status === "Pending"
                      ? "text-orange-500"
                      : transaction.status === "Failed"
                      ? "text-red-500"
                      : ""
                  }`}>
                  {transaction.status}
                </TableCell>
                <TableCell className={`font-mono text-[13px] ${
                    transaction.suspicion === "Suspicious"
                      ? "text-orange-500"
                      : ""
                  }`}>
                  {transaction.suspicion === "Suspicious" && (
                    <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-white hover:text-black h-6 w-6 cursor-pointer"
                        >
                          <TriangleAlert className="h-3.5 w-3.5" />
                          <span className="sr-only">Suspicious Transaction</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="text-white">
                        <p>Suspicious Transaction</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  )}
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}
