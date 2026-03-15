"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const MISSION =
  "We believe everyone deserves skin that gets better with time. Via gives you a routine built around your skin's actual needs, the tools to track whether it's working, and clinicians to guide you when it matters. No guesswork. No wasted products. Just skin that improves — measurably, week over week.";

export default function ForewordSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Ref scoped to just the text block — scroll math is relative to its height only
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"],
  });

  const fillProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100]);

  return (
    <section ref={sectionRef} className="bg-white px-6 py-32 md:py-48">
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[0.2em] uppercase font-['Geist_Mono',monospace] text-black/30 mb-10"
        >
          From the Founder
        </motion.p>

        {/* Dual-layer text fill — ref on this block so scroll range = text height */}
        <motion.div
          ref={textRef}
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Ghost layer — sets container height */}
          <div className="text-[clamp(1.35rem,3.2vw,2.1rem)] font-['Roundo',sans-serif] font-light leading-relaxed text-black/10 select-none">
            {MISSION}
          </div>

          {/* Fill layer — clips from bottom, reveals top-down on scroll */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="text-[clamp(1.35rem,3.2vw,2.1rem)] font-['Roundo',sans-serif] font-light leading-relaxed text-black"
              style={{
                clipPath: useTransform(
                  fillProgress,
                  (latest) => `inset(0 0 ${100 - latest}% 0)`
                ),
              }}
            >
              {MISSION}
            </motion.div>
          </div>
        </motion.div>

        {/* Founder sign-off */}
        <motion.div
          className="mt-14 pt-10 border-t border-black/10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p className="text-black/45 font-['Geist_Mono',monospace] text-sm leading-relaxed max-w-lg mb-10">
            After caring for thousands of patients in dermatology, I kept seeing
            the same problem: people spending money on products that were never
            right for their skin. Nobody was connecting the dots between their
            routine, their products, and their results. I built Via to change that.
          </p>

          {/* Stacked: photo → label + name → signature */}
          <div className="flex flex-col gap-4 w-fit">
            <div className="relative w-28 h-28 overflow-hidden rounded-xl">
              <Image
                src="/samavia.jpeg"
                alt="Samavia Ahmad"
                fill
                className="object-cover grayscale"
              />
            </div>
            <div>
              <p className="text-black/30 font-['Geist_Mono',monospace] text-[10px] tracking-[0.2em] uppercase mb-1">
                Founder · Dermatology Clinician
              </p>
              <p className="text-black font-['Roundo',sans-serif] font-light text-xl">
                Samavia Ahmad
              </p>
            </div>
            <Image
              src="/signature.jpeg"
              alt="Samavia Ahmad signature"
              width={180}
              height={56}
              className="object-contain object-left"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
