"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

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

export function DonorInfo({
  data,
  onUpdate,
  onNext,
  onBack,
}: DonorInfoProps) {
  const [formData, setFormData] = useState(data.donorInfo);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    onUpdate({
      ...data,
      donorInfo: { ...formData, [name]: value },
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isAnonymous: checked }));
    onUpdate({
      ...data,
      donorInfo: { ...formData, isAnonymous: checked },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Information</h2>
        <p className="text-muted-foreground">
          Please provide your details for the donation receipt
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Add a personal message to your donation..."
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={formData.isAnonymous}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="anonymous">Make this donation anonymous</Label>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          className="flex-1"
          onClick={onNext}
          disabled={!formData.name || !formData.email}
        >
          Continue
        </Button>
      </div>
    </div>
  );
} 