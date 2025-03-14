"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare, Eye, EyeOff } from "lucide-react";

interface DonorInfoProps {
  data: {
    donorInfo: {
      name: string;
      email: string;
      message: string;
      isAnonymous: boolean;
    };
  };
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DonorInfo({ data, onUpdate, onNext, onBack }: DonorInfoProps) {
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (field: string, value: string | boolean) => {
    onUpdate({
      ...data,
      donorInfo: {
        ...data.donorInfo,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
          Your Information
        </h2>
        <p className="text-gray-300">
          Tell us about yourself and your donation
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500/50 w-5 h-5" />
            <Input
              id="name"
              placeholder="Enter your full name"
              value={data.donorInfo.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="pl-10 text-lg bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500/50 w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={data.donorInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="pl-10 text-lg bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="message" className="text-gray-300">
              Message (Optional)
            </Label>
            <button
              type="button"
              onClick={() => setShowMessage(!showMessage)}
              className="text-sky-400 hover:text-sky-300"
            >
              {showMessage ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-sky-500/50 w-5 h-5" />
            <Textarea
              id="message"
              placeholder="Add a message to your donation"
              value={data.donorInfo.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="pl-10 text-lg bg-black/50 border-sky-500/20 focus:border-sky-500 text-white min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={data.donorInfo.isAnonymous}
            onCheckedChange={(checked) => handleChange("isAnonymous", checked)}
            className="border-sky-500/20 data-[state=checked]:bg-sky-500"
          />
          <Label
            htmlFor="anonymous"
            className="text-gray-300 cursor-pointer"
          >
            Make my donation anonymous
          </Label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 border-sky-500/20 hover:border-sky-500 text-sky-400"
          >
            Back
          </Button>
          <Button
            className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
            onClick={onNext}
            disabled={!data.donorInfo.name || !data.donorInfo.email}
          >
            Continue
          </Button>
        </div>
      </motion.form>
    </div>
  );
} 