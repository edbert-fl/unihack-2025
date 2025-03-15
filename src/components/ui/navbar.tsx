"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <header
      className="container mx-auto px-4 flex items-center justify-between relative z-10"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjusted to a more subtle blur effect
        backdropFilter: "blur(10px)", // Add a blur to the background
      }}
    >
      <div className="flex items-center gap-2">
        <div>
          <img src="/logo.png" alt="Logo" width={30} height={30} />
        </div>
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
          className="transition-colors text-white hover:text-accent" // Adjusted to ensure better visibility
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
          href="#"
          className="transition-colors text-white hover:text-accent"
        >
          Impact Reports
        </Link>
        <Link
          href="#"
          className="transition-colors text-white hover:text-accent"
        >
          About
        </Link>
      </nav>

      <div className="flex items-center">
        {/* Search section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-lg p-6 mb-6 relative z-20"
        >
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative mt-6 max-w-2xl mx-auto"
          >
            <div className="relative">
              {/* Make the search icon white */}
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-30 h-5 w-5" />
              {/* Input field */}
              <Input
                placeholder="Search"
                className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white focus:border-[var(--primary)] focus:bg-[var(--primary)] focus:text-white text-white placeholder:text-white/50 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
