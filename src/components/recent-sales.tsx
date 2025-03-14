import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

type Transaction = {
  name: string;
  email: string;
  amount: number; // Changed to number
  avatarSrc: string;
  initials: string;
};

export function RecentSales({ className }: React.ComponentProps<"div">) {
  const transactions: Transaction[] = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: 1999.0,
      avatarSrc: "/avatars/01.png",
      initials: "OM",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: 39.0,
      avatarSrc: "/avatars/02.png",
      initials: "JL",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: 299.0,
      avatarSrc: "/avatars/03.png",
      initials: "IN",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      amount: 99.0,
      avatarSrc: "/avatars/04.png",
      initials: "WK",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: 39.0,
      avatarSrc: "/avatars/05.png",
      initials: "SD",
    },
  ];

  // Format amount as currency string
  const formatAmount = (amount: number): string => {
    return `+$${amount.toFixed(2)}`;
  };

  return (
    <div
      className={
        className +
        "border-b border rounded-xl p-4 px-6 w-max h-max backdrop-blur-md bg-white/10 border-white/20"
      }
    >
      <div className="space-y-8">
        <p className="text-2xl font-semibold">Recent Transactions</p>
        {transactions.map((transaction, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={transaction.avatarSrc} alt="Avatar" />
              <AvatarFallback>{transaction.initials}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {transaction.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {transaction.email}
              </p>
            </div>
            <div className="ml-auto font-medium text-green-300">
              {formatAmount(transaction.amount)}
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full border-white text-white">
          View All
        </Button>
      </div>
    </div>
  );
}
