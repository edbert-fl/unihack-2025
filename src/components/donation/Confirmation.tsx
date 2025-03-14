"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Download } from "lucide-react";

interface ConfirmationProps {
  data: {
    amount: number;
    impact: string;
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
  const handleDownloadReceipt = () => {
    // In production, this would generate and download a PDF receipt
    alert("Receipt download coming soon!");
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-500/10 mb-4">
          <CheckCircle2 className="w-8 h-8 text-sky-400" />
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
          Thank You for Your Donation!
        </h2>
        <p className="text-gray-300">
          Your contribution has been successfully processed
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="p-6 bg-black/50 border border-sky-500/20 rounded-lg space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Donation Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Amount</span>
                <span className="text-xl font-semibold text-sky-400">${data.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Impact</span>
                <span className="text-white">{data.impact}</span>
              </div>
            </div>
          </div>

          {!data.donorInfo.isAnonymous && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Donor Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name</span>
                  <span className="text-white">{data.donorInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white">{data.donorInfo.email}</span>
                </div>
                {data.donorInfo.message && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Message</span>
                    <span className="text-white text-right">{data.donorInfo.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 border-sky-500/20 hover:border-sky-500 text-sky-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
            onClick={handleDownloadReceipt}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 