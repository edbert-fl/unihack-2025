"use client"

import { useState, useEffect } from "react"
import type { WalletData } from "@/types/wallet"
// import { DEFAULT_COVER } from "@/default_images/default_cover"
// import { DEFAULT_PROFILE } from "@/default_images/default_profile"

export function useWalletData(walletAddress: string) {
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchWalletData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // In a real application, this would be an API call
        // await fetch(`/api/wallet/${walletAddress}`)

        // For demonstration, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockData: WalletData = {
          profileImage: "",
          coverPhoto: "",
          username: "CryptoWhale",
          balance: "12.3456",
          firstTransaction: "Jan 15, 2022",
          lastTransaction: "Mar 10, 2024",
          transactions: [
            {
              hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
              type: "donation",
              amount: "0.5",
              date: "2024-03-10T14:30:00Z",
              from: walletAddress,
              to: "0x9876543210abcdef9876543210abcdef98765432",
              status: "confirmed",
              gasFee: "0.002",
              isIncoming: false,
              message: "Donation to charity project",
            },
            {
              hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
              type: "withdrawal",
              amount: "1.2",
              date: "2024-03-05T09:15:00Z",
              from: "0x5432109876abcdef5432109876abcdef54321098",
              to: walletAddress,
              status: "confirmed",
              gasFee: "0.003",
              isIncoming: true,
            },
            {
              hash: "0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef",
              type: "purchase",
              amount: "0.75",
              date: "2024-02-28T18:45:00Z",
              from: walletAddress,
              to: "0x6543210987abcdef6543210987abcdef65432109",
              status: "confirmed",
              gasFee: "0.0025",
              isIncoming: false,
              message: "NFT purchase",
            },
            {
              hash: "0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef",
              type: "transfer",
              amount: "0.3",
              date: "2024-02-20T11:30:00Z",
              from: walletAddress,
              to: "0x7654321098abcdef7654321098abcdef76543210",
              status: "pending",
              gasFee: "0.0018",
              isIncoming: false,
            },
            {
              hash: "0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef",
              type: "deposit",
              amount: "2.5",
              date: "2024-02-15T08:20:00Z",
              from: "0x8765432109abcdef8765432109abcdef87654321",
              to: walletAddress,
              status: "confirmed",
              gasFee: "0.004",
              isIncoming: true,
            },
            {
              hash: "0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef",
              type: "withdrawal",
              amount: "0.45",
              date: "2024-02-10T16:10:00Z",
              from: "0x9876543210abcdef9876543210abcdef98765432",
              to: walletAddress,
              status: "failed",
              gasFee: "0.0015",
              isIncoming: true,
            },
          ],
        }

        setWalletData(mockData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch wallet data"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchWalletData()
  }, [walletAddress])

  return { walletData, isLoading, error }
}

