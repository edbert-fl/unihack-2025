"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DonationSummary } from "./DonationSummary";
import { PaymentMethod } from "./PaymentMethod";
import { DonorInfo } from "./DonorInfo";
import { Confirmation } from "./Confirmation";
import { motion } from "framer-motion";

type CheckoutStep = "summary" | "payment" | "info" | "confirmation";

export function DonationCheckout() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("summary");
  const [donationData, setDonationData] = useState({
    amount: 0,
    impact: "",
    paymentMethod: "",
    donorInfo: {
      name: "",
      email: "",
      message: "",
      isAnonymous: false,
    },
  });

  const handleNext = () => {
    switch (currentStep) {
      case "summary":
        setCurrentStep("payment");
        break;
      case "payment":
        setCurrentStep("info");
        break;
      case "info":
        setCurrentStep("confirmation");
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "payment":
        setCurrentStep("summary");
        break;
      case "info":
        setCurrentStep("payment");
        break;
      case "confirmation":
        setCurrentStep("info");
        break;
      default:
        break;
    }
  };

  const steps = ["summary", "payment", "info", "confirmation"];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="p-8 bg-black/50 backdrop-blur-sm border-sky-500/20">
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index !== 3 ? "flex-1" : ""
                }`}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep === step
                      ? "bg-sky-500 border-sky-500 text-white"
                      : "border-sky-500/30 text-sky-500/30"
                  }`}
                >
                  {index + 1}
                </motion.div>
                {index !== 3 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                    className={`flex-1 h-1 mx-2 ${
                      currentStep === step
                        ? "bg-sky-500"
                        : "bg-sky-500/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {currentStep === "summary" && (
            <DonationSummary
              data={donationData}
              onUpdate={setDonationData}
              onNext={handleNext}
            />
          )}
          {currentStep === "payment" && (
            <PaymentMethod
              data={donationData}
              onUpdate={setDonationData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === "info" && (
            <DonorInfo
              data={donationData}
              onUpdate={setDonationData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === "confirmation" && (
            <Confirmation
              data={donationData}
              onBack={handleBack}
            />
          )}
        </motion.div>
      </Card>
    </div>
  );
} 