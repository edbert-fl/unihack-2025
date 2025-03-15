"use client";
import { HeroHighlightDemo } from "@/components/ui/LandingHeroPage";
import { CharityTable } from "@/components/charity-table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Header } from "@/components/ui/navbar";
import "../app/blackhole.css";

export default function Home() {
  return (
    <main className="min-h-screen bg-[rgb(var(--background))] text-[var(--highlight-text)]">
      <ShootingStars />
      <Header />
      {/* Hero section */}
      <div className="relative h-[70vh]">
        <HeroHighlightDemo />
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[var(--primary)]"
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
          className="rounded-lg p-6 mb-6 relative z-20 "
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
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--primary-foreground)]/50 z-30 h-5 w-5" />
              <Input
                placeholder="Search charities or wallet addresses..."
                className="pl-12 h-16 bg-[rgb(var(--background))]/50 backdrop-blur-sm border-[rgb(var(--border))] focus:border-[var(--primary)] text-[var(--primary)] placeholder:text-[var(--primary-foreground)]/50 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Table section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-[rgb(var(--background))]/40 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-[rgb(var(--border))] relative z-20"
        >
          <CharityTable />
        </motion.div>
      </section>
    </main>
  );
}
