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
import { ArrowUp, ArrowDown, TriangleAlert, Currency } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Transaction as WalletTransaction } from '@/types/wallet';
import { stringify } from 'querystring';

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

interface WalletTableProps {
  inputTransactions: WalletTransaction[] | undefined
}

export function WalletTable({ inputTransactions = []} : WalletTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortField, setSortField] = useState<keyof Transaction>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [input, setInput] = useState<WalletTransaction[]>(inputTransactions || []);
  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    const mockTransactions: Transaction[] = [];

    let id = 1
    console.log(inputTransactions)
    for (const transactionData of inputTransactions) {

      function getRandomSuspicion(status: string) {
        const randomValue = Math.random(); // Generates a random number between 0 and 1
        if (randomValue < 0.1 && status === "Success") {
          return "Suspicious";  
        } else {
          return ""; 
        }
      }

      const newData = {
        id: `${id}`,
        charity: transactionData.charity,
        amount: transactionData.amount,
        currency: transactionData.currency,
        timestamp: new Date(transactionData.time).toISOString(),
        wallet: `${transactionData.target.slice(0,6)}...`,
        impact: transactionData.impact,
        status: transactionData.status,
        suspicion: getRandomSuspicion(transactionData.status)
      }
      mockTransactions.push(newData)
      id += 1
    }
    setTransactions(mockTransactions);
  }, [input])

  // Mock data - replace with actual API call
  useEffect(() => {
    if (inputTransactions) {
      setInput(inputTransactions)
    }
  }, [inputTransactions]);

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
