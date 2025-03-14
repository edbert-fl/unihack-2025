"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowDownLeft, ArrowUpRight, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Transaction } from "@/types/wallet"

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const formattedDate = format(new Date(transaction.date), "MMM d, yyyy • h:mm a")
  const shortenedHash = `${transaction.hash.substring(0, 8)}...${transaction.hash.substring(transaction.hash.length - 8)}`
  const shortenedAddress = (address: string) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-gray-500/30"
    }
  }

  const getTypeIcon = (type: string, isIncoming: boolean) => {
    if (isIncoming) {
      return <ArrowDownLeft className="h-4 w-4 text-green-500" />
    }
    return <ArrowUpRight className="h-4 w-4 text-red-500" />
  }

  const getTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case "donation":
        return "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/30"
      case "withdrawal":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30"
      case "deposit":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30"
      case "purchase":
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30"
      case "transfer":
        return "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-gray-500/30"
    }
  }

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-800/50">
      <div className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
            {getTypeIcon(transaction.type, transaction.isIncoming)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <div className="font-medium capitalize text-white">{transaction.type}</div>
              <Badge className={getTypeBadge(transaction.type)}>{transaction.type}</Badge>
            </div>
            <div className="text-sm text-gray-400">{formattedDate}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className={`font-medium ${transaction.isIncoming ? "text-green-500" : "text-red-500"}`}>
              {transaction.isIncoming ? "+" : "-"}
              {transaction.amount} ETH
            </div>
            <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleExpanded} className="hover:bg-white hover:text-black hover:border-gray-400">
            {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-500 hover:text-black" /> : <ChevronDown className="h-4 w-4 text-gray-500 hover:text-black" />}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-gray-700">
          <div className="grid gap-2 text-sm text-white">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-400">Hash:</span>
              <span className="col-span-2 font-mono flex items-center">
                {shortenedHash}
                <a
                  href={`https://etherscan.io/tx/${transaction.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-primary hover:text-primary/80"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="sr-only">View on Etherscan</span>
                </a>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-400">From:</span>
              <span className="col-span-2 font-mono">{shortenedAddress(transaction.from)}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-400">To:</span>
              <span className="col-span-2 font-mono">{shortenedAddress(transaction.to)}</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-400">Gas Fee:</span>
              <span className="col-span-2">{transaction.gasFee} ETH</span>
            </div>

            {transaction.message && (
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-400">Message:</span>
                <span className="col-span-2">{transaction.message}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

