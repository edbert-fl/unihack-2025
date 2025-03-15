import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const recentDonations = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    amount: "0.5 ETH",
    campaign: "Clean Water Initiative",
    date: "2 hours ago",
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    amount: "0.25 ETH",
    campaign: "Education for All",
    date: "5 hours ago",
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    amount: "1.2 ETH",
    campaign: "Medical Supplies",
    date: "1 day ago",
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    amount: "0.8 ETH",
    campaign: "Disaster Relief",
    date: "2 days ago",
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    amount: "0.3 ETH",
    campaign: "Food Security",
    date: "3 days ago",
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

export function RecentDonations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Donations</CardTitle>
        <CardDescription>
          You have received 12 donations this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentDonations.map((donation) => (
            <div key={donation.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={donation.avatar} alt={donation.name} />
                <AvatarFallback>
                  {donation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {donation.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {donation.campaign}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{donation.amount}</p>
                <p className="text-xs text-muted-foreground">{donation.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
