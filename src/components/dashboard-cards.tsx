import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Transaction } from "@/lib/transaction";
import { User } from "@/lib/user";
import { Charity } from "@/lib/charity";

interface DashboardCardsProps {
  charityId?: string;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({
  charityId,
}) => {
  const [cardsData, setCardsData] = useState([
    {
      title: "Top Donation",
      value: "-",
      change: "-",
      period: "from last month",
      icon: DollarSign,
      isPositive: true,
    },
    {
      title: "Total Donations Value",
      value: "-",
      change: "-",
      period: "from last month",
      icon: Users,
      isPositive: true,
    },
    {
      title: "Total Donations",
      value: "-",
      change: "-",
      period: "from last month",
      icon: CreditCard,
      isPositive: true,
    },
    {
      title: "Contributors",
      value: "-",
      change: "-",
      period: "since last hour",
      icon: Activity,
      isPositive: true,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, usersRes, charitiesRes] = await Promise.all([
          fetch("/api/transactions", { method: "GET" }),
          fetch("/api/users", { method: "GET" }),
          fetch("/api/charities", { method: "GET" }),
        ]);

        if (!transactionsRes.ok) {
          throw new Error(`Transactions API error: ${transactionsRes.status}`);
        }

        if (!usersRes.ok) {
          throw new Error(`Users API error: ${usersRes.status}`);
        }

        const transactions = (await transactionsRes.json()) as Transaction[];
        const users = (await usersRes.json()) as User[];
        const charities = (await charitiesRes.json()) as Charity;

        // Filter transactions for the specific charity and "Success" status
        const charityTransactions = transactions.filter(
          (tx: Transaction) => tx.recepientWalletAddress === charityId
        );

        // Calculate Total Donations Value
        const totalValue = charityTransactions.reduce((acc, tx) => {
          const amount = parseFloat(tx.amount);
          return !isNaN(amount) ? acc + amount : acc;
        }, 0);

        // Find Top Donation
        const topDonation = charityTransactions.length
          ? Math.max(
              ...charityTransactions.map((tx: Transaction) => {
                const amount = parseFloat(tx.amount);
                return !isNaN(amount) ? amount : 0;
              })
            )
          : 0;

        // Get unique contributors (users who sent donations to this charity)
        const contributorUserIds = new Set(
          charityTransactions.map((tx: Transaction) => tx.senderWalletAddress)
        );

        // Filter the users to only include those who are contributors (users who sent donations)
        const contributors = users.filter((user: User) =>
          contributorUserIds.has(user._id)
        );

        const newCards = [
          {
            title: "Top Donation",
            value: `$${topDonation.toFixed(2)}`,
            change: "+12%", // Optional static or calculated
            period: "from last month",
            icon: DollarSign,
            isPositive: true,
          },
          {
            title: "Total Donations Value",
            value: `$${totalValue.toFixed(2)}`,
            change: "+25%",
            period: "from last month",
            icon: Users,
            isPositive: true,
          },
          {
            title: "Total Donations",
            value: `${charityTransactions.length}`,
            change: "+18%",
            period: "from last month",
            icon: CreditCard,
            isPositive: true,
          },
          {
            title: "Contributors",
            value: `${contributors.length}`,
            change: "+3%",
            period: "since last hour",
            icon: Activity,
            isPositive: true,
          },
        ];

        setCardsData(newCards);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {cardsData.map((card, index) => (
        <Card
          key={index}
          className="backdrop-blur-md bg-white/10 border-white/20"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-1">
            <div
              className={`text-2xl font-bold ${
                card.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {card.value}
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <span
                className={card.isPositive ? "text-green-500" : "text-red-500"}
              >
                {card.change}
              </span>
              {card.isPositive ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className="text-muted-foreground">{card.period}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
