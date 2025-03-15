"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { Search, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// In a real implementation, you would use a proper data fetching approach
// like React Query, SWR, or server components
interface Charity {
  _id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
}

interface CharitySelectorProps {
  onSelect: (charity: Charity) => void;
}

export function CharitySelector({ onSelect }: CharitySelectorProps) {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [filteredCharities, setFilteredCharities] = useState<Charity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCharities() {
      try {
        const response = await fetch('/api/charities');
        if (!response.ok) throw new Error('Failed to fetch charities');
        const data = await response.json();
        setCharities(data);
        setFilteredCharities(data);
      } catch (error) {
        console.error("Error fetching charities:", error);
        // Fallback data for demo purposes
        const fallbackData = [
          { _id: "1", name: "Reforest Peace", description: "Plant trees to restore forests", category: "Environment", image: "/charities/reforest.jpg" },
          { _id: "2", name: "Ocean Conservation Society", description: "Protecting our oceans", category: "Environment", image: "/charities/ocean.jpg" },
          { _id: "3", name: "Clean Water for All", description: "Providing clean water access", category: "Humanitarian", image: "/charities/water.jpg" },
          { _id: "4", name: "Plant a Tree", description: "Urban reforestation projects", category: "Environment", image: "/charities/plant.jpg" },
          { _id: "5", name: "Wildlife Preservation Trust", description: "Protecting endangered species", category: "Wildlife", image: "/charities/wildlife.jpg" },
        ];
        setCharities(fallbackData);
        setFilteredCharities(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    fetchCharities();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCharities(charities);
      return;
    }

    const filtered = charities.filter((charity) =>
      charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charity.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharities(filtered);
  }, [searchTerm, charities]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
          Choose a Charity
        </h2>
        <p className="text-gray-300">
          Select a charity you'd like to support with your donation
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500/50 w-5 h-5" />
        <Input
          placeholder="Search charities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-black/50 border-sky-500/20 focus:border-sky-500 text-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          // Loading skeletons
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="p-4 bg-black/50 border border-sky-500/20">
              <div className="flex gap-4">
                <Skeleton className="w-16 h-16 rounded-md bg-sky-500/10" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4 bg-sky-500/10" />
                  <Skeleton className="h-4 w-full bg-sky-500/10" />
                </div>
              </div>
            </Card>
          ))
        ) : filteredCharities.length > 0 ? (
          filteredCharities.map((charity) => (
            <motion.div
              key={charity._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="p-4 cursor-pointer bg-black/50 border border-sky-500/20 hover:border-sky-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                onClick={() => onSelect(charity)}
              >
                <div className="flex gap-4 items-center">
                  {charity.image ? (
                    <div className="w-16 h-16 relative rounded-md overflow-hidden">
                      <Image
                        src={charity.image}
                        alt={charity.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-sky-500/10 rounded-md flex items-center justify-center">
                      <Heart className="w-8 h-8 text-sky-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{charity.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{charity.description}</p>
                    <div className="mt-1">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-sky-500/10 text-sky-400">
                        {charity.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No charities found matching "{searchTerm}"</p>
            <Button 
              variant="link" 
              className="text-sky-400 mt-2"
              onClick={() => setSearchTerm("")}
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 