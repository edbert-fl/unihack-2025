"use client";

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
import { ArrowUp, ArrowDown } from "lucide-react";

interface Transaction {
  id: string;
  charity: string;
  amount: string;
  currency: string;
  timestamp: string;
  wallet: string;
  impact: string;
}

export function CharityTable() {
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

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const mockTransactions: Transaction[] = [
      {
        id: "1",
        charity: "Save the Children",
        amount: "5.2",
        currency: "ETH",
        timestamp: new Date().toISOString(),
        wallet: "0x1234...5678",
        impact: "Provided Food for 50 Children",
      },
      {
        id: "2",
        charity: "Red Cross",
        amount: "2.8",
        currency: "BTC",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        wallet: "0x8765...4321",
        impact: "Emergency Relief for Disaster Zone",
      },
    ];

    setTransactions(mockTransactions);

    const generateTransaction = () => {
      setTransactions((prev) => {
        const newTransaction: Transaction = {
          id: Math.random().toString(),
          charity: ["Save the Children", "Red Cross", "UNICEF"][
            Math.floor(Math.random() * 3)
          ],
          amount: (Math.random() * 10).toFixed(2),
          currency: ["ETH", "BTC", "USDT"][Math.floor(Math.random() * 3)],
          timestamp: new Date().toISOString(),
          wallet: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random()
            .toString(16)
            .slice(2, 6)}`,
          impact: "New Donation Received",
        };

        return [newTransaction, ...prev].slice(0, 10); // Ensure only 10 rows
      });

      const nextDelay = 2000 + Math.random() * 5000;
      timeout = setTimeout(generateTransaction, nextDelay);
    };

    generateTransaction();

    return () => clearTimeout(timeout);
  }, []);

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "amount") {
      const aNum = parseFloat(aValue);
      const bNum = parseFloat(bValue);
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }

    if (sortField === "timestamp") {
      const aTime = new Date(aValue).getTime();
      const bTime = new Date(bValue).getTime();
      return sortDirection === "asc" ? aTime - bTime : bTime - aTime;
    }

    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const renderSortIcon = (field: keyof Transaction) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp className="inline w-4 h-4 ml-1 text-accent" />
    ) : (
      <ArrowDown className="inline w-4 h-4 ml-1 text-accent" />
    );
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl backdrop-blur-lg bg-black/40 text-white w-full max-w-7xl mx-auto border border-white/10">
      <Table className="text-base md:text-lg font-inter opacity-90">
        {/* Added opacity to table */}
        <TableHeader className="bg-white/10 backdrop-blur-md text-white/90">
          <TableRow>
            <TableHead
              onClick={() => handleSort("charity")}
              className="cursor-pointer hover:text-accent transition opacity-70"
            >
              Charity {renderSortIcon("charity")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("amount")}
              className="cursor-pointer hover:text-accent transition opacity-70"
            >
              Amount {renderSortIcon("amount")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("currency")}
              className="cursor-pointer hover:text-accent transition opacity-70"
            >
              Currency {renderSortIcon("currency")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("wallet")}
              className="cursor-pointer hover:text-accent transition opacity-70"
            >
              Wallet {renderSortIcon("wallet")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("impact")}
              className="cursor-pointer hover:text-accent transition opacity-70"
            >
              Impact {renderSortIcon("impact")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("timestamp")}
              className="cursor-pointer hover:text-accent transition opacity-70"
            >
              Time {renderSortIcon("timestamp")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-[400px] overflow-y-auto transition-all duration-300 ease-in-out">
          <AnimatePresence>
            {sortedTransactions.slice(0, 10).map((transaction) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="border-b border-white/30 hover:bg-white/40 transition opacity-100"
              >
                <TableCell className="font-semibold text-white/90 opacity-90">
                  {transaction.charity}
                </TableCell>
                <TableCell className="text-green-300 font-bold opacity-90">
                  {transaction.amount}
                </TableCell>
                <TableCell className="text-blue-300 font-medium opacity-90">
                  {transaction.currency}
                </TableCell>
                <TableCell className="font-mono text-white/80 opacity-90">
                  {transaction.wallet}
                </TableCell>
                <TableCell className="text-white/80 opacity-90">
                  {transaction.impact}
                </TableCell>
                <TableCell className="text-white/70 opacity-90">
                  {new Date(transaction.timestamp).toLocaleTimeString()}
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  );
}
