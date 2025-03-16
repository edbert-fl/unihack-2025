"use client"

import { useState } from "react"
import { ProfileSection } from "@/components/wallet/profile-section"
import { useWalletData } from "@/hooks/use-wallet-data"
import { motion } from "framer-motion";
import { WalletTable } from "@/components/wallet/wallet-table";


interface WalletAddressInfoProps {
  walletAddress: string
}

export function WalletAddressInfo({ walletAddress }: WalletAddressInfoProps) {
  const { walletData, isLoading, error } = useWalletData(walletAddress)

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
        <h1 className="text-2xl font-bold md:text-3xl text-sky-400">Wallet Address Information</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-[80vh] max-h-[80vh]">
        <div className="w-full md:w-[20%] lg:w-[26%] flex-shrink-0">
          <ProfileSection
            profileImage={walletData?.profileImage}
            username={walletData?.username}
            walletAddress={walletAddress}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="overflow-auto md:col-span-8 bg-black/30 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-sky-400/20 relative z-20"
        >
          <WalletTable 
            inputTransactions={walletData?.transactions}
          />
        </motion.div>
      </div>
    </div>
  )
}

