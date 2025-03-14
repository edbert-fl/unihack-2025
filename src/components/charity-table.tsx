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
        wallet: "0x1234...5678",
        impact: "Provided food for 50 children",
      },
      {
        id: "2",
        charity: "Red Cross",
        amount: "2.8",
        currency: "BTC",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        wallet: "0x8765...4321",
        impact: "Emergency relief for disaster zone",
      },
      // Add more mock data as needed
    ];

    setTransactions(mockTransactions);

    // Simulate real-time updates
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
          impact: "New donation received",
        };

        return [newTransaction, ...prev].slice(0, 10);
      });

      // ⏱ Random delay between 2s - 5s
      const nextDelay = 2000 + Math.random() * 3000;
      timeout = setTimeout(generateTransaction, nextDelay);
    };

    generateTransaction();

    return () => clearTimeout(timeout);
  }, []);

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
    <div className="rounded-md border overflow-hidden max-h-[400px]">
      {" "}
      {/* Fixed height */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("charity")}
              className="cursor-pointer"
            >
              Charity {renderSortIcon("charity")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("amount")}
              className="cursor-pointer"
            >
              Amount {renderSortIcon("amount")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("currency")}
              className="cursor-pointer"
            >
              Currency {renderSortIcon("currency")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("wallet")}
              className="cursor-pointer"
            >
              Wallet {renderSortIcon("wallet")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("impact")}
              className="cursor-pointer"
            >
              Impact {renderSortIcon("impact")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("timestamp")}
              className="cursor-pointer"
            >
              Time {renderSortIcon("timestamp")}
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
                <TableCell className="font-medium">
                  {transaction.charity}
                </TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.currency}</TableCell>
                <TableCell className="font-mono">
                  {transaction.wallet}
                </TableCell>
                <TableCell>{transaction.impact}</TableCell>
                <TableCell>
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
