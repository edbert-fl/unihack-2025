import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Transaction } from "@/lib/transaction";
import { User } from "@/lib/user";

interface RecentSalesProps {
  className?: string;
  charityId?: string;
}

interface UserMap {
  [key: string]: User;
}

export function RecentSales({ className, charityId }: RecentSalesProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<UserMap>({});

  const fetchUserById = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`);
      const user: User = (await response.json()) as User;

      if (user) {
        setUsers((prevUsers) => ({
          ...prevUsers,
          [id]: user,
        }));
      } else {
        console.error(`User not found for ID: ${id}`);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getInitials = (username: string) => {
    const words = username.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials;
  };

  // Fetch transactions from API inside useEffect hook
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions", { method: "GET" });
        const data = (await response.json()) as Transaction[];
        if (Array.isArray(data)) {
          const charityTransactions = data.filter(
            (tx: any) =>
              tx.recepientWalletAddress === charityId &&
              tx.transactionStatus === "Completed"
          );

          // Sort transactions by transactionTime to get the most recent one
          charityTransactions.sort(
            (a: any, b: any) =>
              new Date(b.transactionTime).getTime() -
              new Date(a.transactionTime).getTime()
          );

          // Collect all sender wallet addresses from the transactions
          const senderAddresses = charityTransactions.map(
            (tx: Transaction) => tx.senderWalletAddress
          );

          // Fetch users for all the unique sender wallet addresses
          senderAddresses.forEach((address) => {
            if (!users[address]) {
              fetchUserById(address);
            }
          });

          const enrichedTransactions = charityTransactions.map((tx) => {
            const user = users[tx.senderWalletAddress];

            return {
              ...tx,
              sender: user
                ? {
                    avatarSrc: user.profilePicture,
                    username: user.username,
                    email: user.email,
                    initials: getInitials(user.username),
                  }
                : null,
            };
          });

          setTransactions(enrichedTransactions);
        } else {
          console.error("API response is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [charityId, users]);

  // Format amount as currency string
  const formatAmount = (amount: number): string => {
    return `+$${amount.toFixed(2)}`;
  };

  return (
    <div
      className={
        className +
        "border-b border rounded-xl p-4 px-6 w-full max-w-md h-[450px] overflow-y-auto backdrop-blur-md bg-white/10 border-white/20"
      }
    >
      <div className="space-y-8">
        <p className="text-2xl font-semibold">Recent Transactions</p>
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((transaction, index) => {
            const user = users[transaction.senderWalletAddress];
            return (
              <div key={index} className="flex items-center">
                <Avatar className="h-9 w-9">
                  {user?.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt="Avatar" />
                  ) : (
                    <AvatarFallback>
                      {user ? getInitials(user.username) : "??"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.username}
                  </p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <div className="ml-auto font-medium text-green-300">
                  {formatAmount(
                    typeof transaction.amount === "number"
                      ? transaction.amount
                      : parseFloat(transaction.amount)
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No completed transactions found.</p>
        )}
      </div>
    </div>
  );
}
