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
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center gap-2">
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <img src="/logo.png" alt="Logo" width={30} height={30} />
        <span
          className="text-2xl font-semibold"
          style={{ color: "rgb(var(--foreground))" }}
        >
          Cryptarity
        </span>
      </Link>
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
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-30 h-5 w-5" />
              <Input
                placeholder="Search"
                className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white focus:bg-transparent focus:text-white text-white placeholder:text-white/50 rounded-full hover:bg-white/20 hover:backdrop-blur-lg transition-all duration-300"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
