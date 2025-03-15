"use client";

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

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wallet, Loader2, CheckCircle2 } from "lucide-react";
import Web3 from "web3";
import { ethers } from "ethers";

interface EthereumPaymentProps {
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
}

export function EthereumPayment({ amount, onSuccess, onBack }: EthereumPaymentProps) {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ethAmount, setEthAmount] = useState<string>("0");

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  useEffect(() => {
    // Convert USD to ETH using a price feed
    const fetchEthPrice = async () => {
      if (!web3) return;
      try {
        // In production, use a reliable price feed API
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
        const data = await response.json();
        const ethPrice = data.ethereum.usd;
        const ethAmount = (amount / ethPrice).toFixed(6);
        setEthAmount(ethAmount);
      } catch (err) {
        console.error("Error fetching ETH price:", err);
      }
    };

    fetchEthPrice();
  }, [web3, amount]);

  const connectWallet = async () => {
    if (!web3) {
      setError("Please install MetaMask to make Ethereum payments");
      return;
    }

    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not found");
      }
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err) {
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handlePayment = async () => {
    if (!web3 || !account) return;

    setIsProcessing(true);
    try {
      // In production, this would be your donation contract address
      const donationAddress = "0x..."; // Replace with actual contract address
      
      // Create transaction
      const transaction = {
        from: account,
        to: donationAddress,
        value: web3.utils.toWei(ethAmount, "ether"),
      };

      // Send transaction
      const receipt = await web3.eth.sendTransaction(transaction);
      
      // Show success
      onSuccess();
    } catch (err) {
      setError("Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
          Pay with Ethereum
        </h2>
        <p className="text-gray-300">
          Connect your wallet to make a secure payment
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        <div className="p-6 bg-black/50 border border-sky-500/20 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Amount in USD</span>
            <span className="text-xl font-semibold text-white">${amount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Amount in ETH</span>
            <span className="text-xl font-semibold text-sky-400">{ethAmount} ETH</span>
          </div>
          {account && (
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Connected Account</span>
              <span className="text-white font-mono text-sm">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 border-sky-500/20 hover:border-sky-500 text-sky-400"
          >
            Back
          </Button>
          {!account ? (
            <Button
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Wallet className="w-4 h-4 mr-2" />
              )}
              Connect Wallet
            </Button>
          ) : (
            <Button
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4 mr-2" />
              )}
              Confirm Payment
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
} 