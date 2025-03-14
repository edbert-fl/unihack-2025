"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, ChevronDown, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TransactionItem } from "@/components/transactions-item"
import type { Transaction } from "@/types/wallet"

interface TransactionsListProps {
  transactions: Transaction[]
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterType, setFilterType] = useState<string>("all")

  // Filter transactions based on search query and type filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.from.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || transaction.type === filterType

    return matchesSearch && matchesType
  })

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "amount") {
      return sortOrder === "asc"
        ? Number.parseFloat(a.amount) - Number.parseFloat(b.amount)
        : Number.parseFloat(b.amount) - Number.parseFloat(a.amount)
    }
    return 0
  })

  // Get unique transaction types for filter
  const transactionTypes = ["all", ...new Set(transactions.map((t) => t.type))]

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">Transactions</CardTitle>
        <CardDescription className="text-gray-400">View all transactions for this wallet address</CardDescription>

        <div className="flex flex-col gap-4 mt-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by hash, address..."
              className="pl-8 h-10 rounded-md bg-white text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-white text-black w-[130px]">
                <Filter className="bg-white text-black mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                {transactionTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px] bg-white text-black">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black">
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
              </SelectContent>
            </Select>

            <Button className="h-10 bg-white text-black hover:bg-white hover:text-black hover:border-gray-400" variant="outline" size="icon" onClick={toggleSortOrder}>
              {sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {sortedTransactions.length > 0 ? (
          <div className="space-y-4">
            {sortedTransactions.map((transaction) => (
              <TransactionItem key={transaction.hash} transaction={transaction} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No transactions found</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

