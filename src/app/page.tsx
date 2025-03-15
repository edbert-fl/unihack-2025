"use client";
import { HeroHighlightDemo } from "@/components/ui/LandingHeroPage";
import { CharityTable } from "@/components/charity-table";
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
      <div className="relative h-[58vh]">
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
        {/* Table section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CharityTable />
        </motion.div>
      </section>
    </main>
  );
}
