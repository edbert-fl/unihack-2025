"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentSalesProps {
  className?: string;
  charityId: string;
}

interface MockTransaction {
  senderWalletAddress: string;
  recepientWalletAddress: string;
  transactionStatus: string;
  transactionTime: string;
  amount: number | string;
}

interface MockUser {
  walletAddress: string;
  username: string;
  email: string;
  profilePicture?: string;
}

const mockUsers: MockUser[] = [
  {
    walletAddress: "wallet1",
    username: "Alice Johnson",
    email: "alice@example.com",
    profilePicture: "",
  },
  {
    walletAddress: "wallet2",
    username: "Bob Smith",
    email: "bob@example.com",
    profilePicture: "",
  },
  {
    walletAddress: "wallet3",
    username: "Charlie Brown",
    email: "charlie@example.com",
    profilePicture: "",
  },
  {
    walletAddress: "wallet4",
    username: "Dana Rose",
    email: "dana@example.com",
    profilePicture: "",
  },
  {
    walletAddress: "wallet5",
    username: "Eli Turner",
    email: "eli@example.com",
    profilePicture: "",
  },
];

const mockTransactions: MockTransaction[] = [
  {
    senderWalletAddress: "wallet1",
    recepientWalletAddress: "charity-abc",
    transactionStatus: "Completed",
    transactionTime: "2025-03-15T14:20:00Z",
    amount: 250,
  },
  {
    senderWalletAddress: "wallet2",
    recepientWalletAddress: "charity-abc",
    transactionStatus: "Completed",
    transactionTime: "2025-03-15T12:10:00Z",
    amount: 120,
  },
  {
    senderWalletAddress: "wallet3",
    recepientWalletAddress: "charity-abc",
    transactionStatus: "Completed",
    transactionTime: "2025-03-14T17:30:00Z",
    amount: 180,
  },
  {
    senderWalletAddress: "wallet4",
    recepientWalletAddress: "charity-abc",
    transactionStatus: "Completed",
    transactionTime: "2025-03-13T11:45:00Z",
    amount: 90,
  },
  {
    senderWalletAddress: "wallet5",
    recepientWalletAddress: "charity-abc",
    transactionStatus: "Completed",
    transactionTime: "2025-03-12T08:25:00Z",
    amount: 310,
  },
];

export function RecentSales({ className = "", charityId }: RecentSalesProps) {
  const [transactions, setTransactions] = useState<
    (MockTransaction & { sender?: MockUser; initials?: string })[]
  >([]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const enriched = mockTransactions
      .filter(
        (tx) =>
          tx.recepientWalletAddress === charityId &&
          tx.transactionStatus === "Completed"
      )
      .sort(
        (a, b) =>
          new Date(b.transactionTime).getTime() -
          new Date(a.transactionTime).getTime()
      )
      .map((tx) => {
        const sender = mockUsers.find(
          (user) => user.walletAddress === tx.senderWalletAddress
        );

        return {
          ...tx,
          sender,
          initials: sender ? getInitials(sender.username) : "??",
        };
      });

    setTransactions(enriched);
  }, [charityId]);

  const formatAmount = (amount: number | string) =>
    `+$${parseFloat(amount as string).toFixed(2)}`;

  return (
    <div
      className={
        className +
        " border-b border rounded-xl p-4 px-6 w-full max-w-md h-[450px] overflow-y-auto backdrop-blur-md bg-white/10 border-white/20"
      }
    >
      <div className="space-y-8">
        <p className="text-2xl font-semibold">Recent Transactions</p>
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((tx, i) => (
            <div key={i} className="flex items-center">
              <Avatar className="h-9 w-9">
                {tx.sender?.profilePicture ? (
                  <AvatarImage src={tx.sender.profilePicture} alt="Avatar" />
                ) : (
                  <AvatarFallback>{tx.initials}</AvatarFallback>
                )}
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {tx.sender?.username || "Unknown User"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {tx.sender?.email || "No Email"}
                </p>
              </div>
              <div className="ml-auto font-medium text-green-300">
                {formatAmount(tx.amount)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No completed transactions found.
          </p>
        )}
      </div>
    </div>
  );
}