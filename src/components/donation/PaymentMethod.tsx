"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EthereumPayment } from "./EthereumPayment";
import { CreditCardPayment } from "./CreditCardPayment";
import { motion } from "framer-motion";
import { CreditCard, Coins, Wallet, ShoppingCart } from "lucide-react";

interface PaymentMethodProps {
  data: {
    amount: number;
    impact: string;
    paymentMethod: string;
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const PAYMENT_METHODS = [
  {
    id: "card",
    name: "Credit Card",
    icon: CreditCard,
    description: "Pay with Visa, Mastercard, or American Express",
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    icon: Coins,
    description: "Pay with Bitcoin, Ethereum, or other cryptocurrencies",
  },
  {
    id: "wallet",
    name: "Digital Wallet",
    icon: Wallet,
    description: "Pay with Apple Pay, Google Pay, or Samsung Pay",
  },
  {
    id: "afterpay",
    name: "Afterpay",
    icon: ShoppingCart,
    description: "Pay with Afterpay to split your payment into 4 installments",
  },
];

export function PaymentMethod({
  data,
  onUpdate,
  onNext,
  onBack,
}: PaymentMethodProps) {
  const [activeTab, setActiveTab] = useState("card");

  const handlePaymentMethodSelect = (method: string) => {
    onUpdate({ ...data, paymentMethod: method });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
          Choose Payment Method
        </h2>
        <p className="text-gray-300">
          Select how you would like to make your donation
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {PAYMENT_METHODS.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                activeTab === method.id
                  ? "bg-sky-500/10 border-sky-500"
                  : "bg-black/50 border-sky-500/20 hover:border-sky-500/50"
              }`}
              onClick={() => {
                setActiveTab(method.id);
                handlePaymentMethodSelect(method.id);
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  activeTab === method.id
                    ? "bg-sky-500/20 text-sky-400"
                    : "bg-sky-500/10 text-sky-500/70"
                }`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{method.name}</h3>
                  <p className="text-sm text-gray-400">{method.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-4"
      >
        <Card className="p-6 bg-black/50 border-sky-500/20">
          {activeTab === "card" && (
            <CreditCardPayment
              amount={data.amount}
              onSuccess={() => onNext()}
            />
          )}
          {activeTab === "crypto" && (
            <EthereumPayment
              amount={data.amount}
              onSuccess={() => onNext()}
            />
          )}
          {activeTab === "wallet" && (
            <div className="text-center py-8">
              <p className="text-gray-300">Digital wallet integration coming soon</p>
            </div>
          )}
          {activeTab === "afterpay" && (
            <div className="text-center py-8">
              <p className="text-gray-300">Afterpay integration coming soon</p>
            </div>
          )}
        </Card>
      </motion.div>

      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 py-8 border-sky-500/20 hover:border-sky-500 text-sky-400"
        >
          Back
        </Button>
        <Button
          className="flex-1 py-8 bg-sky-500 hover:bg-sky-600 text-white"
          onClick={onNext}
          disabled={!data.paymentMethod}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}