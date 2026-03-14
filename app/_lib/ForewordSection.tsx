"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const MISSION =
  "We believe everyone deserves skin that works for them. Via combines AI-powered analysis with expert skincare guidance to give you a routine that's actually yours. No guesswork. No wasted products. Just skin that gets better over time.";

export default function ForewordSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // clipPath goes from inset(0 0 100% 0) → inset(0 0 0% 0) as user scrolls through
  // This reveals the foreground text from top to bottom
  const clipPath = useTransform(
    scrollYProgress,
    [0.15, 0.75],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  );

  return (
    <section ref={ref} className="bg-white px-6 py-32 md:py-40">
      <div className="max-w-3xl mx-auto">
        <p className="text-[10px] tracking-[0.2em] uppercase font-['Geist_Mono',monospace] text-black/30 mb-10">
          Our Mission
        </p>
        <div className="relative">
          {/* Ghost — always rendered, sets container height */}
          <p className="text-[clamp(1.35rem,3.2vw,2.1rem)] font-['Roundo',sans-serif] font-light leading-relaxed text-black/[0.08] select-none">
            {MISSION}
          </p>

          {/* Foreground fill — clipped from bottom, revealed on scroll */}
          <motion.p
            className="absolute inset-0 text-[clamp(1.35rem,3.2vw,2.1rem)] font-['Roundo',sans-serif] font-light leading-relaxed text-black"
            style={{ clipPath }}
          >
            {MISSION}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
