import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Calendar } from "lucide-react";

const campaigns = [
  {
    id: "1",
    name: "Clean Water Initiative",
    description: "Providing clean water to communities in need",
    target: "10 ETH",
    raised: "7.5 ETH",
    progress: 75,
    daysLeft: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Education for All",
    description: "Supporting education in underprivileged areas",
    target: "15 ETH",
    raised: "9.3 ETH",
    progress: 62,
    daysLeft: 18,
    status: "active",
  },
  {
    id: "3",
    name: "Medical Supplies",
    description: "Delivering essential medical supplies to rural clinics",
    target: "8 ETH",
    raised: "6.4 ETH",
    progress: 80,
    daysLeft: 5,
    status: "urgent",
  },
  {
    id: "4",
    name: "Disaster Relief",
    description: "Emergency support for natural disaster victims",
    target: "20 ETH",
    raised: "12.8 ETH",
    progress: 64,
    daysLeft: 21,
    status: "active",
  },
];

export function ActiveCampaigns() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Active Campaigns</CardTitle>
          <CardDescription>
            Monitor and manage your ongoing fundraising campaigns
          </CardDescription>
        </div>
        <Button className="ml-auto" variant="outline">
          View All
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="grid gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{campaign.name}</h3>
                    {campaign.status === "urgent" && (
                      <Badge variant="destructive">Urgent</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {campaign.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {campaign.daysLeft} days left
                  </span>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{campaign.raised}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      of {campaign.target}
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    {campaign.progress}%
                  </div>
                </div>
                <Progress value={campaign.progress} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
