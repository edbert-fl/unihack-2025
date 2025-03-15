import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./hero-highlight";
import { FiBarChart2 } from "react-icons/fi"; // BarChart2 icon from 'fi'
import { BlackHoleEffect } from "@/components/ui/black-hole-effect";

export function HeroHighlightDemo() {
  return (
    <main className="container mx-auto px-4 pt-16 pb-8 text-center relative z-10">
      <div className="max-w-4xl mx-auto mb-16">
        <motion.h1
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.5, 0.05, 0.1, 0.9],
          }}
          className="text-5xl md:text-6xl mb-6 "
        >
          <span className="text-white">Transform</span>{" "}
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent px-2 py-1 rounded">
            Cryptocurrency
          </span>{" "}
          <span className="text-white">into</span> <br />
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent px-2 py-1 rounded">
            Charitable Impact
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 1.2,
            ease: [0.68, 0, 0.1, 1],
          }}
          className="text-xl text-[var(--muted-foreground)] mb-12 max-w-3xl mx-auto"
        >
          Track cryptocurrency donations in real-time and see your impact on
          global communities.
        </motion.p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:from-[var(--primary-foreground)] hover:to-[var(--accent-foreground)] transition-colors px-6 py-3 rounded-lg text-white font-medium">
            Start Donating
          </button>
          <button className="bg-[var(--background)] hover:bg-[var(--secondary)] transition-colors px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2">
            <FiBarChart2 className="w-5 h-5" />
            View Impact Dashboard
          </button>
        </div>
        <BlackHoleEffect className="absolute top-[-50%] h-full z-0" />
      </div>
    </main>
  );
}
