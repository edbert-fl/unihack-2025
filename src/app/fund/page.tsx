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

// Sample funding stories data
const FUNDING_STORIES = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Fighting Stage 3 Cancer",
    story: "Sarah, a single mother of two, was recently diagnosed with stage 3 breast cancer. She needs support for her medical treatments and to provide for her children during this difficult time.",
    goal: 50000,
    raised: 32450,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "The Martinez Family",
    title: "Rebuilding After Hurricane",
    story: "The Martinez family lost everything when Hurricane Maria destroyed their home. They're seeking help to rebuild their house and restore their lives.",
    goal: 35000,
    raised: 12800,
    image: "https://images.unsplash.com/photo-1574724713425-fee7e2eacf8a?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "David Chen",
    title: "Emergency Heart Surgery",
    story: "David needs an urgent heart surgery that his insurance won't fully cover. Your support will help save his life and support his recovery journey.",
    goal: 75000,
    raised: 45600,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Emily Williams",
    title: "Special Needs Education",
    story: "Emily's son requires specialized education and therapy for his autism. Help provide him with the support he needs to thrive.",
    goal: 25000,
    raised: 18900,
    image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 5,
    name: "The Thompson Family",
    title: "Recovery from Fire Disaster",
    story: "A devastating house fire left the Thompson family without a home. They need support to find temporary housing and replace essential items.",
    goal: 40000,
    raised: 28700,
    image: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 6,
    name: "Michael Foster",
    title: "Veteran Medical Care",
    story: "Michael, a disabled veteran, requires ongoing medical care and rehabilitation. Your support will help cover his essential medical expenses.",
    goal: 30000,
    raised: 21500,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 7,
    name: "Lisa Anderson",
    title: "Small Business Recovery",
    story: "Lisa's small bakery was severely impacted by the pandemic. She needs help to keep her business running and support her employees.",
    goal: 20000,
    raised: 15800,
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 8,
    name: "Robert Kim",
    title: "Rare Disease Treatment",
    story: "Robert was diagnosed with a rare genetic disorder requiring expensive treatment. Help him access the medical care he desperately needs.",
    goal: 60000,
    raised: 42300,
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 9,
    name: "The Garcia Children",
    title: "Education Fund",
    story: "After losing both parents in a tragic accident, the Garcia children need support for their education and daily needs.",
    goal: 45000,
    raised: 31200,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 10,
    name: "The Green Initiative",
    title: "Community Solar Project",
    story: "A local community is raising funds to install solar panels in their low-income neighborhood. This project will reduce energy costs for 50 families and promote sustainable living.",
    goal: 55000,
    raised: 27500,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 11,
    name: "Alex Rivera",
    title: "Prosthetic Leg for Young Athlete",
    story: "Alex, a promising 15-year-old athlete, lost his leg in an accident. He needs a specialized prosthetic leg to continue pursuing his dream of competing in para-athletics.",
    goal: 35000,
    raised: 23400,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=300&h=200&fit=crop"
  },
  {
    id: 12,
    name: "Tech4All Foundation",
    title: "Rural Computer Lab",
    story: "Help establish a computer lab in a rural school serving 200 students. The project will provide essential digital literacy skills and create opportunities for underprivileged children.",
    goal: 28000,
    raised: 19600,
    image: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?q=80&w=300&h=200&fit=crop"
  }
];

interface FundingStory {
  id: number;
  name: string;
  title: string;
  story: string;
  goal: number;
  raised: number;
  image: string;
}

interface FundingRequest {
  name: string;
  email: string;
  phone: string;
  amount: string;
  reason: string;
  story: string;
}

export default function FundPage() {
  const [selectedStory, setSelectedStory] = useState<FundingStory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    setSelectedStory(story);
    setIsDialogOpen(true);
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
    <main className="min-h-screen bg-[rgb(var(--background))] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--accent)]/10 via-transparent to-transparent" />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)]"
            >
              Support Individual Stories
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-[var(--highlight-text)]"
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
                <Card 
                  className="overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 bg-[var(--secondary)] border-[var(--border)]/20"
                  onClick={() => handleStoryClick(story)}
                >
                  <div className="px-4 pt-4">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-[var(--highlight-text)]">{story.title}</h3>
                    <p className="text-[var(--muted-foreground)] line-clamp-2">{story.story}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted-foreground)]">Raised</span>
                        <span className="text-[var(--primary)]">${story.raised.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--primary)] rounded-full"
                          style={{ width: `${(story.raised / story.goal) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted-foreground)]">Goal</span>
                        <span className="text-[var(--highlight-text)]">${story.goal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </Card>
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
              <h2 className="text-2xl font-semibold text-[var(--highlight-text)]">
                Are you in need?
              </h2>
              <p className="text-[var(--muted-foreground)]">
                Request crypto funding for yourself and get support from our community
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                className="bg-[var(--accent)] text-[var(--highlight-text)] px-8 py-6 text-lg transition-transform hover:scale-105 cursor-pointer"
                onClick={() => setIsRequestFormOpen(true)}
              >
                Request Funding
              </Button>
            </motion.div>
          </div>

          {/* Funding Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-[var(--secondary)] border-[var(--border)]/20 text-[var(--highlight-text)] max-w-2xl">
              {selectedStory && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
                      {selectedStory.title}
                    </DialogTitle>
                    <DialogDescription className="text-[var(--muted-foreground)]">
                      Support {selectedStory.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="px-4">
                      <img 
                        src={selectedStory.image} 
                        alt={selectedStory.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-[var(--highlight-text)]">{selectedStory.story}</p>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--muted-foreground)]">Raised</span>
                          <span className="text-[var(--primary)]">${selectedStory.raised.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[var(--primary)] rounded-full"
                            style={{ width: `${(selectedStory.raised / selectedStory.goal) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--muted-foreground)]">Goal</span>
                          <span className="text-[var(--highlight-text)]">${selectedStory.goal.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Button 
                          className="w-full bg-[var(--primary)] cursor-pointer text-[var(--highlight-text)] transition-transform hover:scale-105"
                          onClick={() => window.location.href = `/donate?story=${selectedStory.id}`}
                        >
                          Donate with Crypto
                        </Button>
                        <Button 
                          className="w-full bg-[var(--primary)] cursor-pointer text-white hover:scale-105"
                          onClick={() => window.location.href = `/donate?story=${selectedStory.id}&method=card`}
                        >
                          Donate with Card
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Request Form Dialog */}
          <Dialog open={isRequestFormOpen} onOpenChange={setIsRequestFormOpen}>
            <DialogContent className="bg-[var(--secondary)] border-[var(--border)]/20 text-[var(--highlight-text)] max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] cursor-pointer">
                  Request Funding
                </DialogTitle>
                <DialogDescription className="text-[var(--muted-foreground)]">
                  Fill out the form below to submit your funding request
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRequestSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[var(--highlight-text)]">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={fundingRequest.name}
                      onChange={handleInputChange}
                      required
                      className="bg-[var(--secondary)] border-[var(--border)]/20 text-[var(--highlight-text)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[var(--highlight-text)]">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={fundingRequest.email}
                      onChange={handleInputChange}
                      required
                      className="bg-[var(--secondary)] border-[var(--border)]/20 text-[var(--highlight-text)]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[var(--highlight-text)]">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={fundingRequest.phone}
                      onChange={handleInputChange}
                      className="bg-[var(--secondary)] border-[var(--border)]/20 text-[var(--highlight-text)]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-[var(--highlight-text)]">Amount Needed ($)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={fundingRequest.amount}
                      onChange={handleInputChange}
                      required
                      className="bg-[var(--secondary)] border-[var(--border)]/20 text-[var(--highlight-text)]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason" className="text-[var(--highlight-text)]">Reason for Funding</Label>
                  <Input
                    id="reason"
                    name="reason"
                    value={fundingRequest.reason}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of why you need funding"
                    className="bg-[var(--secondary)] border-[var(--border)]/20 text-[var(--highlight-text)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="story" className="text-[var(--highlight-text)]">Your Story</Label>
                  <Textarea
                    id="story"
                    name="story"
                    value={fundingRequest.story}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us more about your situation and how the funding will help..."
                    className="min-h-[150px] bg-[var(--secondary)] border-[var(--border)]/20 text-[var(--highlight-text)]"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsRequestFormOpen(false)}
                    className="border-[var(--border)]/20 text-[var(--primary)] transition-transform hover:scale-105"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[var(--primary)] text-[var(--highlight-text)] transition-transform hover:scale-105"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Success Dialog */}
          <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
            <DialogContent className="bg-[var(--secondary)] border-[var(--border)]/20 text-[var(--highlight-text)] max-w-md">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-[var(--primary)]/20 p-3">
                    <CheckCircle2 className="w-8 h-8 text-[var(--primary)]" />
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold text-[var(--highlight-text)]">
                  Request Submitted
                </DialogTitle>
                <DialogDescription className="text-[var(--muted-foreground)]">
                  Your funding request has been submitted successfully. Our team will review your request and contact you through the provided contact information.
                </DialogDescription>
                <Button
                  className="bg-[var(--primary)] text-[var(--highlight-text)] transition-transform hover:scale-105 cursor-pointer mt-4"
                  onClick={() => setIsSuccessDialogOpen(false)}
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