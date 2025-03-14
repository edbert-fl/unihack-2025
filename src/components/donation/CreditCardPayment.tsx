"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { CreditCard, Lock } from "lucide-react";

interface CreditCardPaymentProps {
  amount: number;
  onSuccess: () => void;
}

export function CreditCardPayment({ amount, onSuccess }: CreditCardPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // In production, this would integrate with Stripe
      // const response = await stripe.confirmCardPayment({
      //   payment_method: {
      //     card: elements.getElement('card'),
      //   },
      // });

      onSuccess();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
          Pay with Credit Card
        </h3>
        <p className="text-gray-300">
          Enter your card details to complete the donation
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="text-gray-300">
            Card Number
          </Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500/50 w-5 h-5" />
            <Input
              id="cardNumber"
              name="number"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={handleInputChange}
              maxLength={19}
              required
              className="pl-10 bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry" className="text-gray-300">
              Expiry Date
            </Label>
            <Input
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              maxLength={5}
              required
              className="bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvc" className="text-gray-300">
              CVC
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500/50 w-5 h-5" />
              <Input
                id="cvc"
                name="cvc"
                type="password"
                placeholder="123"
                value={cardDetails.cvc}
                onChange={handleInputChange}
                maxLength={4}
                required
                className="pl-10 bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Donation Amount</Label>
          <div className="flex gap-2">
            <Input
              value={amount}
              readOnly
              className="font-mono bg-black/50 border-sky-500/20 text-sky-400"
            />
            <span className="flex items-center text-gray-300">USD</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Lock className="w-4 h-4" />
          <span>Your payment is secure and encrypted</span>
        </div>

        <Button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </Button>
      </motion.form>
    </div>
  );
} 