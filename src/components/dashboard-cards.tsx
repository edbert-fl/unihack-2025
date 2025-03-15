import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export function DashboardCards() {
  // Define a structure for card data
  const cardsData = [
    {
      title: "Top Donations",
      value: "$45,231.89",
      change: "+20.1%",
      period: "from last month",
      icon: DollarSign,
      isPositive: true,
    },
    {
      title: "Total Donations Value",
      value: "$69696969696.99",
      change: "+180.1%",
      period: "from last month",
      icon: Users,
      isPositive: true,
    },
    {
      title: "Total Donations",
      value: "+12,234",
      change: "+19%",
      period: "from last month",
      icon: CreditCard,
      isPositive: true,
    },
    {
      title: "Contributors",
      value: "573",
      change: "-5.2%",
      period: "since last hour",
      icon: Activity,
      isPositive: false,
    },
  ];

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
}
