"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { FundingStory, FUNDING_STORIES } from "@/lib/funding-stories";
import Link from "next/link";

interface FundingRequest {
  name: string;
  email: string;
  phone: string;
  amount: string;
  reason: string;
  story: string;
}

export default function FundPage() {
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [fundingRequest, setFundingRequest] = useState<FundingRequest>({
    name: "",
    email: "",
    phone: "",
    amount: "",
    reason: "",
    story: ""
  });

  const handleStoryClick = (story: FundingStory) => {
    window.open(`/stories/${story.slug}`, '_blank');
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the fundingRequest to your backend
    console.log("Funding request submitted:", fundingRequest);
    setIsRequestFormOpen(false);
    setIsSuccessDialogOpen(true);
    // Reset form
    setFundingRequest({
      name: "",
      email: "",
      phone: "",
      amount: "",
      reason: "",
      story: ""
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFundingRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold pb-2 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400"
            >
              Support Individual Stories
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              Make a direct impact by supporting individuals in need through cryptocurrency donations.
              Every contribution helps transform lives and create positive change.
            </motion.p>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FUNDING_STORIES.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/stories/${story.slug}`} target="_blank">
                  <Card 
                    className="overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 bg-black/50 border-sky-500/20 hover:border-sky-500/50"
                  >
                    <div className="px-4 pt-4">
                      <img 
                        src={story.image} 
                        alt={story.title}
                        className="w-full h-84 object-cover rounded-lg"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-white">{story.title}</h3>
                      <p className="text-gray-300 line-clamp-2">{story.story}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Raised</span>
                          <span className="text-sky-400">${story.raised.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2 bg-sky-500/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-sky-500 rounded-full"
                            style={{ width: `${(story.raised / story.goal) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Goal</span>
                          <span className="text-white">${story.goal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Request Funding Section */}
          <div className="mt-16 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <h2 className="text-2xl font-semibold text-white">
                Are you in need?
              </h2>
              <p className="text-gray-300">
                Request crypto funding for yourself and get support from our community
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg transition-transform hover:scale-105 cursor-pointer"
                onClick={() => setIsRequestFormOpen(true)}
              >
                Request Funding
              </Button>
            </motion.div>
          </div>

          {/* Request Form Dialog */}
          <Dialog open={isRequestFormOpen} onOpenChange={setIsRequestFormOpen}>
            <DialogContent className="bg-black/50 border-sky-500/20 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
                  Request Funding
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Fill out the form below to submit your funding request
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={fundingRequest.name}
                      onChange={handleInputChange}
                      required
                      className="bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={fundingRequest.email}
                      onChange={handleInputChange}
                      required
                      className="bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={fundingRequest.phone}
                      onChange={handleInputChange}
                      className="bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-white">Amount Needed ($)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={fundingRequest.amount}
                      onChange={handleInputChange}
                      required
                      className="bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-white">Reason for Funding</Label>
                  <Input
                    id="reason"
                    name="reason"
                    value={fundingRequest.reason}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of why you need funding"
                    className="bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="story" className="text-white">Your Story</Label>
                  <Textarea
                    id="story"
                    name="story"
                    value={fundingRequest.story}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us more about your situation and how the funding will help..."
                    className="bg-black/50 border-sky-500/20 focus:border-sky-500 text-white min-h-[150px]"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    onClick={() => setIsRequestFormOpen(false)}
                    className="bg-black/50 border-sky-500/20 text-white cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-white cursor-pointer"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Success Dialog */}
          <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
            <DialogContent className="bg-black/50 border-sky-500/20 text-white max-w-md">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-sky-400" />
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold text-white">
                  Request Submitted
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Your request has been submitted, and after reviewing your request you will be contacted by authorities.
                </DialogDescription>
                <Button
                  onClick={() => setIsSuccessDialogOpen(false)}
                  className="bg-sky-500 hover:bg-sky-600 text-white w-full"
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
} 