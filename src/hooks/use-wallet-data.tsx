"use client";

import { useState, useEffect } from "react";
import type { WalletData } from "@/types/wallet";

export function useWalletData(walletAddress: string) {
  const [walletData, setWalletData] = useState<WalletData | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        let data: WalletData | null = null;
        
        const userResponse = await fetch(`/api/users/${walletAddress}`);
        if (userResponse.ok) {
          data = await userResponse.json();
        } else {
          const charityResponse = await fetch(`/api/charities/${walletAddress}`);
          if (charityResponse.ok) {
            data = await charityResponse.json();
          }
        }
        
        // Fallback to mock data if no data fetched
        if (!data) {
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
                  time: "2024-02-15T10:45:00Z",
                },
              ],
            },
          ];
          data = mockData.find(
            (wallet) => wallet.walletAddress === walletAddress
          ) || null;
        }
        
        // Update the state with the fetched data
        setWalletData(data);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchWalletData();
  }, []);

  return walletData;
}
