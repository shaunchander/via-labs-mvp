"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const MISSION =
  "We believe everyone deserves skin that gets better with time. Via gives you a routine built around your skin's actual needs, the tools to track whether it's working, and weekly insights to guide you when it matters. No more guesswork or wasted products. Just skin that improves, measurably, week over week.";

export default function ForewordSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"],
  });

  const fillProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100]);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: "#EDE7DC" }}
    >
      {/* Subtle noise — same class, parchment tones it down naturally */}
      <div className="noise-overlay z-10 opacity-40" />

      {/* Ghosted decorative quote mark — editorial weight, no clutter */}
      <div
        className="pointer-events-none absolute left-[4%] top-[6%] font-['Roundo',sans-serif] leading-none select-none"
        style={{
          fontSize: "clamp(10rem,22vw,18rem)",
          color: "rgba(28,25,23,0.04)",
          lineHeight: 1,
        }}
      >
        &ldquo;
      </div>

      <div className="max-w-3xl mx-auto relative z-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.2em] uppercase font-['Geist_Mono',monospace] mb-10"
          style={{ color: "rgba(28,25,23,0.38)" }}
        >
          From the Founder
        </motion.p>

        {/* Dual-layer text fill */}
        <motion.div
          ref={textRef}
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Ghost layer — sets container height */}
          <div
            className="text-[clamp(1.35rem,3.2vw,2.1rem)] font-['Roundo',sans-serif] font-light leading-relaxed select-none"
            style={{ color: "rgba(28,25,23,0.08)" }}
          >
            {MISSION}
          </div>

          {/* Fill layer — dark ink inks in over parchment on scroll */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="text-[clamp(1.35rem,3.2vw,2.1rem)] font-['Roundo',sans-serif] font-light leading-relaxed"
              style={{
                color: "#1C1917",
                clipPath: useTransform(
                  fillProgress,
                  (latest) => `inset(0 0 ${100 - latest}% 0)`,
                ),
              }}
            >
              {MISSION}
            </motion.div>
          </div>
        </motion.div>

        {/* Founder sign-off */}
        <motion.div
          className="mt-14 pt-10"
          style={{ borderTop: "1px solid rgba(28,25,23,0.12)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Sage-green left border rule — ties back to hero's green accent */}
          <div
            className="pl-4 max-w-lg mb-10"
            style={{ borderLeft: "2px solid rgba(134,180,120,0.55)" }}
          >
            <p
              className="font-['Geist_Mono',monospace] text-sm leading-relaxed"
              style={{ color: "rgba(28,25,23,0.52)" }}
            >
              After caring for thousands of patients in dermatology, I kept
              seeing the same problem: people spending money on products that
              were never right for their skin. I built Via to better help people
              connect the dots between their routine, their products, and their
              results.
            </p>
          </div>

          {/* Stacked: photo → label + name */}
          <div className="flex flex-col gap-4 w-fit">
            <div
              className="relative w-28 h-28 overflow-hidden rounded-xl"
              style={{ boxShadow: "0 4px 24px rgba(28,25,23,0.10)" }}
            >
              <Image
                src="/samavia.png"
                alt="Samavia Ahmad"
                fill
                className="object-cover"
                style={{ filter: "sepia(30%) contrast(0.95) brightness(0.98)" }}
                draggable={false}
              />
            </div>
            <div>
              <p
                className="font-['Geist_Mono',monospace] text-[10px] tracking-[0.2em] uppercase mb-1"
                style={{ color: "rgba(28,25,23,0.35)" }}
              >
                Founder · Dermatology Clinician
              </p>
              <p
                className="font-['Roundo',sans-serif] font-light text-xl"
                style={{ color: "#1C1917" }}
              >
                Samavia Ahmad, MSc
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
