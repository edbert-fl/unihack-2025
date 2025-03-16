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
  charityId: string;
}

const mockTransactions: Transaction[] = [
  {
    _id: "tx1",
    amount: "100.50",
    senderWalletAddress: "user1",
    recepientWalletAddress: "charity123",
    transactionStatus: "Success",
    description: "Saved Children", // Added description
    transactionTime: "2025-03-15T10:30:00Z",
    filter: [],
  },
  {
    _id: "tx2",
    amount: "250.00",
    senderWalletAddress: "user2",
    recepientWalletAddress: "charity123",
    transactionStatus: "Success",
    description: "Food for Families", // Added description
    transactionTime: "2025-03-14T08:00:00Z",
    filter: [],
  },
  {
    _id: "tx3",
    amount: "75.20",
    senderWalletAddress: "user3",
    recepientWalletAddress: "charity456",
    transactionStatus: "Success",
    description: "Clean Water Project", // Added description
    transactionTime: "2025-03-13T15:45:00Z",
    filter: [],
  },
];

const mockUsers: User[] = [
  {
    _id: "#a1b2c3d4",
    profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
    username: "alice_walker",
    email: "alice.walker@gmail.com",
    passwordHash: "hashed_password_1",
    filter: [],
  },
  {
    _id: "#e5f6g7h8",
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
    username: "bob_smith",
    email: "bob.smith@yahoo.com",
    passwordHash: "hashed_password_2",
    filter: [],
  },
  {
    _id: "#i9j0k1l2",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    username: "charlie_james",
    email: "charlie.james@hotmail.com",
    passwordHash: "hashed_password_3",
    filter: [],
  },
  {
    _id: "#m3n4o5p6",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
    username: "diana_brown",
    email: "diana.brown@gmail.com",
    passwordHash: "hashed_password_4",
    filter: [],
  },
  {
    _id: "#q7r8s9t0",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
    username: "edward_martin",
    email: "edward.martin@yahoo.com",
    passwordHash: "hashed_password_5",
    filter: [],
  },
];

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
    const loadMockData = () => {
      const charityTransactions = mockTransactions.filter(
        (tx) =>
          tx.recepientWalletAddress === charityId &&
          tx.transactionStatus === "Success"
      );

      const totalValue = charityTransactions.reduce((acc, tx) => {
        const amount = parseFloat(tx.amount);
        return !isNaN(amount) ? acc + amount : acc;
      }, 0);

      const topDonation = charityTransactions.length
        ? Math.max(
            ...charityTransactions.map((tx) => {
              const amount = parseFloat(tx.amount);
              return !isNaN(amount) ? amount : 0;
            })
          )
        : 0;

      const contributorUserIds = new Set(
        charityTransactions.map((tx) => tx.senderWalletAddress)
      );

      const contributors = mockUsers.filter((user) =>
        contributorUserIds.has(user._id)
      );

      const newCards = [
        {
          title: "Top Donation",
          value: `$${topDonation.toFixed(2)}`,
          change: "+12%",
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
    };

    loadMockData();
  }, [charityId]);

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
