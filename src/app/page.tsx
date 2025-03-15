"use client"

import { useState } from "react";
import { HeroHighlightDemo } from "@/components/ui/LandingHeroPage";
import { CharityTable } from "@/components/charity-table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Header } from "@/components/ui/navbar";
import type { Charity } from "@/lib/charity";
import { useRouter } from "next/navigation";
export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Function to handle the search input change
  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // Only call the API if there's input
    if (value.trim()) {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?query=${value}`);
        const data = await response.json();
        setSuggestions(data.charities || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <main className="min-h-screen">
      <ShootingStars />
      <Header />
      {/* Hero section */}
      <div className="relative h-[70vh]">
        <HeroHighlightDemo />
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sky-400"
        />
      </div>

      {/* Main content section */}
      <section className="py-10 px-4 max-w-7xl mx-auto -mt-20 relative z-10">
        {/* Search section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-lg shadow-lg p-6 mb-6 relative z-20"
        >
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative mt-6 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sky-400/50 z-30 h-5 w-5" />
              <Input
                placeholder="Search charities or wallet addresses..."
                className="pl-12 h-16 bg-black/30 backdrop-blur-sm border-sky-400/30 focus:border-sky-400 text-sky-400/50 placeholder:text-sky-400/50 rounded-full"
                value={query}
                onChange={handleSearchChange}
              />
            </div>

            {/* Display search suggestions */}
            {loading ? (
              <div className="mt-4 text-sky-400">Loading...</div>
            ) : (
              suggestions.length > 0 && (
                <div className="mt-4 bg-black/30 backdrop-blur-sm rounded-lg shadow-lg max-h-60 overflow-auto">
                  {suggestions.map((suggestion: Charity, index: number) => (
                    <div key={suggestion._id} className="p-4 text-sky-400 cursor-pointer hover:bg-black/40" onClick={() => router.push(`/${suggestion.name.replace(/ /g, '-')}`)}>
                      {suggestion.name}
                    </div>
                  ))}
                </div>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Table section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-black/30 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-sky-400/20 relative z-20"
        >
          <CharityTable />
        </motion.div>
      </section>
    </main>
  );
}
