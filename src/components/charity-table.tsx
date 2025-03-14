"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { motion, AnimatePresence } from "framer-motion"

interface Transaction {
  id: string
  charity: string
  amount: string
  currency: string
  timestamp: string
  wallet: string
  impact: string
}

export function CharityTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [sortField, setSortField] = useState<keyof Transaction>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Mock data - replace with actual API call
  useEffect(() => {
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
    ]

    setTransactions(mockTransactions)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const newTransaction: Transaction = {
          id: Math.random().toString(),
          charity: ["Save the Children", "Red Cross", "UNICEF"][Math.floor(Math.random() * 3)],
          amount: (Math.random() * 10).toFixed(2),
          currency: ["ETH", "BTC", "USDT"][Math.floor(Math.random() * 3)],
          timestamp: new Date().toISOString(),
          wallet: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
          impact: "New donation received",
        }
        return [newTransaction, ...prev].slice(0, 10)
      })
    }, 2000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const sortedTransactions = [...transactions].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue)
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Charity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Wallet</TableHead>
            <TableHead>Impact</TableHead>
            <TableHead>Time</TableHead>
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
                transition={{ duration: 0.2 }}
              >
                <TableCell className="font-medium">{transaction.charity}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.currency}</TableCell>
                <TableCell className="font-mono">{transaction.wallet}</TableCell>
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
  )
}