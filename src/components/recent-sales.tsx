import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Transaction = {
  name: string;
  email: string;
  amount: string;
  avatarSrc: string;
  initials: string;
};

export function RecentSales({ className }: React.ComponentProps<"div">) {
  const transactions: Transaction[] = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
      avatarSrc: "/avatars/01.png",
      initials: "OM",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "+$39.00",
      avatarSrc: "/avatars/02.png",
      initials: "JL",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
      avatarSrc: "/avatars/03.png",
      initials: "IN",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      amount: "+$99.00",
      avatarSrc: "/avatars/04.png",
      initials: "WK",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "+$39.00",
      avatarSrc: "/avatars/05.png",
      initials: "SD",
    },
  ];

  return (
    <div className={className}>
      <div className="space-y-8">
        <p className="text-2xl font-semibold">Transaction List</p>
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
            <div className="ml-auto font-medium">{transaction.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
