"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DonationSummaryProps {
  data: {
    amount: number;
    impact: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
}

const IMPACT_OPTIONS = [
  { amount: 5, impact: "Plant 1 tree" },
  { amount: 20, impact: "Plant 4 trees" },
  { amount: 50, impact: "Plant 10 trees" },
  { amount: 100, impact: "Plant 20 trees" },
];

export function DonationSummary({ data, onUpdate, onNext }: DonationSummaryProps) {
  const [customAmount, setCustomAmount] = useState("");

  const handleAmountSelect = (amount: number, impact: string) => {
    onUpdate({ ...data, amount, impact });
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    const amount = parseFloat(value);
    if (!isNaN(amount) && amount > 0) {
      const trees = Math.floor(amount / 5);
      onUpdate({
        ...data,
        amount,
        impact: `Plant ${trees} tree${trees !== 1 ? "s" : ""}`,
      });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
          Choose Your Impact
        </h2>
        <p className="text-gray-300">
          Select a preset amount or enter your own contribution
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {IMPACT_OPTIONS.map((option, index) => (
          <motion.div
            key={option.amount}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                data.amount === option.amount
                  ? "bg-sky-500/10 border-sky-500"
                  : "bg-black/50 border-sky-500/20 hover:border-sky-500/50"
              }`}
              onClick={() => handleAmountSelect(option.amount, option.impact)}
            >
              <div className="text-2xl font-bold text-sky-400">${option.amount}</div>
              <div className="text-sm text-gray-300 mt-2">{option.impact}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="customAmount" className="text-gray-300">
          Custom Amount
        </Label>
        <div className="flex gap-2">
          <Input
            id="customAmount"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              handleCustomAmount(e.target.value);
            }}
         
            className="text-xl font-medium bg-black/50 border-sky-500/20 focus:border-sky-500 text-white placeholder:text-gray-500"
          />
          <span className="flex items-center text-xl text-gray-300">USD</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-4"
      >
        <Button
          className="w-full py-8 bg-sky-500 hover:bg-sky-600 text-white"
          onClick={onNext}
          disabled={data.amount <= 0}
        >
          Continue to Payment
        </Button>
      </motion.div>
    </div>
  );
} 