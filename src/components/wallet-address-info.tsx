"use client"

import { useState } from "react"
import { ProfileSection } from "@/components/profile-section"
import { TransactionsList } from "@/components/transactions-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useWalletData } from "@/hooks/use-wallet-data"

interface WalletAddressInfoProps {
  walletAddress: string
}

export function WalletAddressInfo({ walletAddress }: WalletAddressInfoProps) {
  const { walletData, isLoading, error } = useWalletData(walletAddress)
  const [activeTab, setActiveTab] = useState("overview")

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="mt-4 text-gray-400">Loading wallet information...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-red-400">Error loading wallet data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl text-white">Wallet Address Information</h1>
      </div>

      <div className="grid gap-6">
        <ProfileSection
          profileImage={walletData?.profileImage}
          username={walletData?.username}
          walletAddress={walletAddress}
        />

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="inline-flex bg-gray-900">
            <TabsTrigger value="transactions" className="cursor-pointer relative text-gray-400 data-[state=active]:bg-white data-[state=active]:text-black">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="details" className="cursor-pointer relative text-gray-400 data-[state=active]:bg-white data-[state=active]:text-black">Wallet Details</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions" className="mt-4">
            <TransactionsList transactions={walletData?.transactions || []} />
          </TabsContent>
          <TabsContent value="details" className="mt-4">
            <div className="bg-gray-900 rounded-lg border border-gray-800 shadow-sm p-6 text-white">
              <h3 className="text-lg font-medium mb-4">Wallet Details</h3>
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Address:</span>
                  <span className="font-mono text-sm break-all">{walletAddress}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Balance:</span>
                  <div className="flex items-center gap-2">
                    <span>{walletData?.balance || "0.00"} ETH</span>
                    <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/30">
                      ~$23,456.78 USD
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">First Transaction:</span>
                  <span>{walletData?.firstTransaction || "N/A"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Last Transaction:</span>
                  <span>{walletData?.lastTransaction || "N/A"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Wallet Type:</span>
                  <div className="flex items-center gap-2">
                    <span>Smart Contract Wallet</span>
                    <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30">
                      Multi-sig
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

