"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./hero-highlight";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        Transform{" "}
        <Highlight className="text-black">
          Cryptocurrency
        </Highlight>{" "}
        into{" "}
        <Highlight className="text-black">
          Charitable Impact
        </Highlight>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-4 text-lg text-white max-w-2xl mx-auto text-center"
      >
        Track and verify cryptocurrency donations in real-time. See how your contributions make a difference in communities worldwide.
      </motion.p>
    </HeroHighlight>
  );
} 