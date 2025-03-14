"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { Coins, Wallet, Lock } from "lucide-react";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (params: any) => void) => void;
      removeListener: (eventName: string, callback: (params: any) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

interface EthereumPaymentProps {
  amount: number;
  onSuccess: () => void;
}

export function EthereumPayment({ amount, onSuccess }: EthereumPaymentProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      if (!window.ethereum) {
        alert("Please install MetaMask or another Web3 wallet");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const account = accounts[0];
      setWalletAddress(account);
      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      if (!window.ethereum) {
        alert("Please install MetaMask or another Web3 wallet");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Convert USD amount to ETH (this would need to be done with an oracle in production)
      const ethAmount = ethers.parseEther(amount.toString());

      // Send transaction (replace with actual contract address)
      const tx = await signer.sendTransaction({
        to: "0x...", // Replace with actual donation address
        value: ethAmount,
      });

      await tx.wait();
      onSuccess();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Failed to process payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
          Pay with Ethereum
        </h3>
        <p className="text-gray-300">
          Connect your wallet to make a donation
        </p>
      </div>

      {!isConnected ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-4 p-6 bg-black/50 border border-sky-500/20 rounded-lg">
            <div className="p-3 bg-sky-500/10 rounded-lg">
              <Wallet className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white">Connect Your Wallet</h4>
              <p className="text-sm text-gray-400">
                Connect your Web3 wallet to proceed with the payment
              </p>
            </div>
          </div>

          <Button
            className="w-full bg-sky-500 hover:bg-sky-600 text-white"
            onClick={connectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label className="text-gray-300">Connected Wallet</Label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500/50 w-5 h-5" />
              <Input
                value={walletAddress}
                readOnly
                className="pl-10 font-mono bg-black/50 border-sky-500/20 text-sky-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Donation Amount</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500/50 w-5 h-5" />
                <Input
                  value={amount}
                  readOnly
                  className="pl-10 font-mono bg-black/50 border-sky-500/20 text-sky-400"
                />
              </div>
              <span className="flex items-center text-gray-300">USD</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Lock className="w-4 h-4" />
            <span>Your transaction is secure and encrypted</span>
          </div>

          <Button
            className="w-full bg-sky-500 hover:bg-sky-600 text-white"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Confirm Payment"}
          </Button>
        </motion.div>
      )}
    </div>
  );
} 