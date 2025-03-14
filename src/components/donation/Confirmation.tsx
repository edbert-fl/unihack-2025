"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ConfirmationProps {
  data: {
    amount: number;
    impact: string;
    paymentMethod: string;
    donorInfo: {
      name: string;
      email: string;
      message: string;
      isAnonymous: boolean;
    };
  };
  onBack: () => void;
}

export function Confirmation({ data, onBack }: ConfirmationProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Thank You for Your Donation!</h2>
        <p className="text-muted-foreground">
          Your contribution has been successfully processed
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Donation Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">${data.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Impact</span>
                <span className="font-medium">{data.impact}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium capitalize">
                  {data.paymentMethod === "crypto" ? "Ethereum" : "Credit Card"}
                </span>
              </div>
            </div>
          </div>

          {!data.donorInfo.isAnonymous && (
            <div>
              <h3 className="font-semibold mb-2">Donor Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{data.donorInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{data.donorInfo.email}</span>
                </div>
                {data.donorInfo.message && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Message</span>
                    <span className="font-medium">{data.donorInfo.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          A confirmation email has been sent to{" "}
          {data.donorInfo.isAnonymous ? "your email" : data.donorInfo.email}
        </p>
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={onBack}>
          Back to Donation
        </Button>
      </div>
    </div>
  );
} 