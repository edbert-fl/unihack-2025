"use client";

import React, {useState, useRef, useEffect} from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Charity } from "@/lib/charity";
import { useRouter } from "next/navigation";


export const Header = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Charity[]>([]);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // Only call the API if there's input
    if (value.trim()) {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?query=${value}`);
        const data = await response.json();
        console.log("Search API response:", data);
        
        // Check if data exists and has the expected structure
        if (data && Array.isArray(data.charities)) {
          setSuggestions(data.charities);
        } else {
          console.error("Unexpected API response format:", data);
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="container mx-auto px-4 flex items-center justify-between relative z-10"
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" width={30} height={30} />
        <span
          className="text-2xl font-semibold"
          style={{ color: "rgb(var(--foreground))" }}
        >
          Cryptarity
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="#"
          className="transition-colors text-white hover:text-accent"
        >
          How It Works
        </Link>
        <Link
          href="#"
          className="transition-colors text-white hover:text-accent"
        >
          Charities
        </Link>
        <Link
          href="/about"
          className="text-gray-300 hover:text-sky-400 transition-colors"
        >
          About
        </Link>
        <Link
          href="/donate"
          className="text-gray-300 hover:text-sky-400 transition-colors"
        >
          Donate
        </Link>
        <Link
          href="/fund"
          className="text-gray-300 hover:text-sky-400 transition-colors"
        >
          Individuals
        </Link>
        <Link
          href="/dashboard"
          className="text-gray-300 hover:text-sky-400 transition-colors"
        >
          Dashboard
        </Link>
      </nav>

      <div className="flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-lg p-6 mb-6 relative z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative mt-6 max-w-2xl mx-auto"
          >
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-30 h-5 w-5" />
              <Input
                placeholder="Search for charities..."
                className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white focus:bg-transparent focus:text-white text-white placeholder:text-white/50 rounded-full hover:bg-white/20 hover:backdrop-blur-lg transition-all duration-300"
                value={query}
                onChange={handleSearchChange}
              />
            </div>
            {suggestions.length > 0 && (
              <div 
                className="absolute top-full left-0 w-full mt-2 bg-transparent backdrop-blur-lg border border-white/20 rounded-lg shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto"
              >
                <div className="p-2 text-sm text-white/70 bg-white/10 border-b border-white/20">
                  {suggestions.length} results found
                </div>
                {suggestions.map((charity) => (
                  <Link 
                    key={charity._id}
                    href={`/charity/${charity._id}`}
                    className="block p-3 hover:bg-white/30 cursor-pointer transition-all"
                    onClick={() => {
                      console.log("Charity clicked:", charity);
                      setSuggestions([]);
                      setQuery('');
                    }}
                  >
                    <h3>{charity.name}</h3>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;

