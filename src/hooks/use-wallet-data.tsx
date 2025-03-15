"use client"

import { useState, useEffect } from "react"
import type { WalletData } from "@/types/wallet"

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

        const mockData: WalletData[] = [
          {
            profileImage: undefined,
            walletAddress: "0x4b8e68f6ab345c1a9a214d7e678c35db6e8e5bfc",
            coverPhoto: undefined,
            username: "CryptoWhale",
            firstTransaction: "2022-01-15T10:30:00Z",
            lastTransaction: "2024-12-05T18:20:00Z",
            transactions: [
              {
                charity: "Red Cross",
                amount: "1.2",
                currency: "ETH",
                impact: "Provided medical supplies to disaster-affected areas",
                target: "0xa1b2c3d4e5f678901234567890abcdef12345678",
                status: "Success",
                time: "2024-02-15T10:45:00Z"
              },
              {
                charity: "Save the Children",
                amount: "0.8",
                currency: "ETH",
                impact: "Funded meals for underprivileged children",
                target: "0x9876543210abcdef9876543210abcdef98765432",
                status: "Success",
                time: "2024-03-20T14:30:00Z"
              },
              {
                charity: "UNICEF",
                amount: "2.5",
                currency: "BTC",
                impact: "Supported education programs in rural areas",
                target: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
                status: "Pending",
                time: "2024-04-25T08:10:00Z"
              },
              {
                charity: "WaterAid",
                amount: "3.0",
                currency: "USDT",
                impact: "Helped provide clean drinking water to communities",
                target: "0x1234567890abcdef1234567890abcdef12345678",
                status: "Success",
                time: "2024-06-05T17:50:00Z"
              },
              {
                charity: "Feeding America",
                amount: "0.6",
                currency: "ETH",
                impact: "Contributed to food banks across the country",
                target: "0xaabbccddeeff0011223344556677889900112233",
                status: "Success",
                time: "2024-07-12T09:15:00Z"
              },
              {
                charity: "WWF",
                amount: "1.0",
                currency: "BTC",
                impact: "Helped conserve endangered wildlife habitats",
                target: "0xccddeeffaabb99887766554433221100aabbccdd",
                status: "Failed",
                time: "2024-09-18T13:40:00Z"
              },
              {
                charity: "Direct Relief",
                amount: "5.0",
                currency: "ETH",
                impact: "Provided emergency aid for flood victims",
                target: "0x99887766554433221100aabbccddeeffaabbccdd",
                status: "Success",
                time: "2024-11-23T22:05:00Z"
              }
            ],
          },
          {
            profileImage: undefined,
            walletAddress: "0x3f4a67c1d8b9e24a6f78a2c3e5d4b1f8c2a0b6d9",
            coverPhoto: undefined,
            username: "iwanttodonate",
            firstTransaction: "2022-01-15T14:20:00Z",
            lastTransaction: "2024-10-22T15:10:00Z",
            transactions: [
              {
                charity: "Doctors Without Borders",
                amount: "1.5",
                currency: "ETH",
                impact: "Funded medical treatment for conflict zones",
                target: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
                status: "Success",
                time: "2024-03-05T12:30:00Z"
              },
              {
                charity: "Habitat for Humanity",
                amount: "2.0",
                currency: "BTC",
                impact: "Helped build homes for families in need",
                target: "0x1234567890abcdef1234567890abcdef12345678",
                status: "Pending",
                time: "2024-05-15T08:20:00Z"
              },
              {
                charity: "World Food Programme",
                amount: "0.9",
                currency: "USDT",
                impact: "Provided emergency food assistance",
                target: "0xaabbccddeeff0011223344556677889900112233",
                status: "Success",
                time: "2024-08-10T18:45:00Z"
              },
              {
                charity: "Rainforest Alliance",
                amount: "3.2",
                currency: "ETH",
                impact: "Supported conservation efforts in the Amazon",
                target: "0xccddeeffaabb99887766554433221100aabbccdd",
                status: "Failed",
                time: "2024-10-22T15:10:00Z"
              }
            ]
          },
          {
            profileImage: undefined,
            walletAddress: "0x3f4a67c1d8b9e24a6f78a2c3e5d4b1f8c2a0b6d9",
            coverPhoto: undefined,
            username: "cryptoEnthusiast",
            firstTransaction: "2022-01-15T14:20:00Z",
            lastTransaction: "2024-03-10T10:05:00Z",
            transactions: [
              {
                "charity": "The Ocean Cleanup",
                "amount": "2.0",
                "currency": "ETH",
                "impact": "Helped remove 500 kg of plastic waste from oceans",
                "target": "0xb1c3d4e5f678901234567890abcdef1234567890",
                "status": "Success",
                "time": "2024-03-10T10:05:00Z"
              },
              {
                "charity": "Doctors Without Borders",
                "amount": "1.5",
                "currency": "ETH",
                "impact": "Funded medical treatment for 40 patients in conflict zones",
                "target": "0xa9b8c7d6e5f4a3b2c1d09876b5a4c3d2e1a0b9f8",
                "status": "Success",
                "time": "2023-12-05T08:45:00Z"
              },
              {
                "charity": "Habitat for Humanity",
                "amount": "2.0",
                "currency": "BTC",
                "impact": "Built 5 homes for low-income families in the region",
                "target": "0x3f2b6c9a7d6e8f901234567890abcdef12345678",
                "status": "Pending",
                "time": "2023-09-18T17:30:00Z"
              },
              {
                "charity": "Save the Children",
                "amount": "0.8",
                "currency": "USDT",
                "impact": "Provided school supplies and education for 200 children",
                "target": "0x1234a56c7890abcefe12d34567890abcdef123456",
                "status": "Success",
                "time": "2023-06-22T11:20:00Z"
              },
              {
                "charity": "WWF",
                "amount": "1.0",
                "currency": "ETH",
                "impact": "Supported conservation efforts for endangered species",
                "target": "0xdd3b9f8d76a7d56a8bc29d8f1b2c9a67d8ef5b3f",
                "status": "Failed",
                "time": "2023-03-14T16:10:00Z"
              },
              {
                "charity": "World Wildlife Fund",
                "amount": "0.6",
                "currency": "BTC",
                "impact": "Contributed to anti-poaching campaigns in Africa",
                "target": "0x4a0c8d2b0e3f67890abcd987654321a0d5b8d02f",
                "status": "Success",
                "time": "2022-12-18T14:55:00Z"
              }
            ]
          }
        ]

        const walletData = mockData.find(wallet => wallet.walletAddress ===walletAddress)
        if (walletData) {
          setWalletData(walletData)
        }
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

