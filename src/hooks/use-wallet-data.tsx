"use client";

import { useState, useEffect } from "react";
import type { WalletData } from "@/types/wallet";

export async function useWalletData(walletAddress: string) {
  let walletData: WalletData | undefined = undefined;
    try {
        
        const userResponse = await fetch(`/api/users/${walletAddress}`, { cache: 'no-store' });
        if (userResponse.ok) {
            walletData = await userResponse.json();
            console.log(walletData)
            const transactionResponse = await fetch(`/api/transactions/sender/${walletAddress}`);
            // target: string
            // charity: string
            // amount: string
            // currency: string
            // impact: string
            // time: string
            // status: string
            // flag: boolean

            function getRandomCharity(): string {
                const charities = [
                  "Red Cross",
                  "WWF",
                  "Blue Cross",
                  "Purple Cross",
                  "Clean Water for All",
                  "Ocean Conservation Society"
                ];
                const randomIndex = Math.floor(Math.random() * charities.length);
                return charities[randomIndex];
            }
            function getRandomUTCDate() {
                // Define start and end dates in UTC using Date.UTC
                const start = new Date(Date.UTC(2022, 0, 1)); // January is month 0
                const end = new Date(Date.UTC(2024, 11, 31, 23, 59, 59)); // December is month 11
              
                // Calculate the difference in milliseconds between the two dates
                const diff = end.getTime() - start.getTime();
              
                // Generate a random offset in milliseconds
                const randomOffset = Math.floor(Math.random() * diff);
              
                // Return a new Date object with the random offset added
                return new Date(start.getTime() + randomOffset);
            }
                        
            if (transactionResponse.ok) {
                const transactionData = await transactionResponse.json()

                const mappedTransaction = transactionData.map((t: { recepientWalletAddress: any; amount: any; description: any; transactionTime: any; transactionStatus: any; flagged: any; }) => {
                    return {
                        target: t.recepientWalletAddress,
                        charity: getRandomCharity(),
                        amount: t.amount,
                        currency: "ETH",
                        impact: t.description,
                        time: getRandomUTCDate(),
                        status: t.transactionStatus,
                        flag: t.flagged,
                    }
                })

                return {
                    profileImage: walletData?.profileImage,
                    coverPhoto: "",
                    walletAddress: walletAddress,
                    username: (walletData as WalletData).username,
                    firstTransaction: walletData?.firstTransaction ?? "",  // Default to an empty string if undefined
                    lastTransaction: walletData?.lastTransaction ?? "",  // Default to an empty string if undefined
                    transactions: mappedTransaction,
                };
            }
        } else {
            const charityResponse = await fetch(`/api/charities/${walletAddress}`);
            if (charityResponse.ok) {
                walletData = await charityResponse.json();
                return {
                    profileImage: walletData?.profileImage,
                    coverPhoto: "",
                    walletAddress: walletAddress,
                    username: (walletData as WalletData).username,
                    firstTransaction: walletData?.firstTransaction ?? "",  // Default to an empty string if undefined
                    lastTransaction: walletData?.lastTransaction ?? "",  // Default to an empty string if undefined
                    transactions: walletData?.transactions ?? [],
                };
            }
        } 
    } catch (error) {
        console.log("Error fetching wallet data:", error);
    }

    // Update the state ith the fetched data
};

