"use client";

import { motion } from "motion/react";
import FastMarquee from "react-fast-marquee";

const ITEMS = [
  "Waitlist Now Open",
  "Know Your Skin",
  "AI-Powered Analysis",
  "Join 500+ Early Members",
];

function Dot() {
  return <span className="text-white/20 mx-6">·</span>;
}

export default function Marquee() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 4.5 }}
    >
      <div className="h-9 flex items-center">
        <FastMarquee speed={35} gradient={false}>
          {ITEMS.map((item, i) => (
            <span
              key={i}
              className="text-white/50 uppercase text-[10px] tracking-[0.2em] font-['Geist_Mono',monospace] flex items-center"
            >
              {item}
              <Dot />
            </span>
          ))}
        </FastMarquee>
      </div>
    </motion.div>
  );
}
