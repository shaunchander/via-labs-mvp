"use client";

import { motion } from "motion/react";

const BASE_ITEMS = [
  "Waitlist Now Open",
  "Know Your Skin",
  "AI-Powered Analysis",
  "Join 500+ Early Members",
];

// Duplicate for seamless loop — animate -50% of total width
const ITEMS = [...BASE_ITEMS, ...BASE_ITEMS];

export default function Marquee() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 4.5 }}
    >
      <div className="flex items-center h-9">
        <motion.div
          className="flex items-center gap-0 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {ITEMS.map((item, i) => (
            <span
              key={i}
              className="text-white/50 uppercase text-[10px] tracking-[0.2em] font-['Geist_Mono',monospace] flex items-center"
            >
              <span className="px-8">{item}</span>
              <span className="text-white/20">·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
