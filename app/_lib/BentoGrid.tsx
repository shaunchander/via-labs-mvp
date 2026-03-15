"use client";

import { motion } from "motion/react";
import {
  TrendingDown,
  CalendarDays,
  Package,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import MagicCard from "./MagicCard";
import { fadeUp, stagger, viewportOnce } from "./animations";
import RoutinePlayer from "./remotion/RoutinePlayer";

// Skin age tracker card — wide, gets its own visual treatment
function SkinAgeCard() {
  const weeks = [
    { wk: "Wk 1", val: "25.4" },
    { wk: "Wk 2", val: "25.1" },
    { wk: "Wk 3", val: "24.8" },
    { wk: "Wk 4", val: "24.3" },
  ];

  return (
    <MagicCard className="p-8 min-h-[220px] flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      <div className="flex items-start gap-5">
        <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/10 flex items-center justify-center shrink-0">
          <TrendingDown size={17} className="text-white/50" />
        </div>
        <div>
          <h3 className="text-white font-['Roundo',sans-serif] font-light text-xl mb-2 leading-snug">
            Skin Age Tracker
          </h3>
          <p className="text-white/40 text-sm font-['Geist_Mono',monospace] leading-relaxed max-w-xs">
            A weekly score that reflects your skin&apos;s biological age. Follow your
            routine and watch the number drop. Skip it, and it climbs back.
          </p>
        </div>
      </div>

      {/* Stat widget */}
      <div className="shrink-0 flex items-end gap-6 rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5">
        <div>
          <p className="text-white/25 font-['Geist_Mono',monospace] text-[9px] tracking-[0.2em] uppercase">
            This week
          </p>
          <p className="text-white text-5xl font-['Roundo',sans-serif] font-light leading-none mt-1.5">
            24.3
          </p>
          <p className="text-emerald-400/70 font-['Geist_Mono',monospace] text-[10px] mt-2">
            ↓ 1.1 since you started
          </p>
        </div>
        <div className="flex flex-col gap-1 pb-1">
          {weeks.map(({ wk, val }, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-white/20 font-['Geist_Mono',monospace] text-[9px] w-8">
                {wk}
              </span>
              <span
                className={`font-['Geist_Mono',monospace] text-[10px] tabular-nums ${
                  i === weeks.length - 1 ? "text-white/80" : "text-white/25"
                }`}
              >
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MagicCard>
  );
}

const features = [
  {
    icon: CalendarDays,
    label: "Your Routine",
    description:
      "Morning and evening routines built around your skin's actual needs. Updated as your skin improves — not a one-size-fits-all plan.",
  },
  {
    icon: Package,
    label: "Product Tracker",
    description:
      "Log what you're already using. See what's helping, what's wasting your money, and what's missing from your shelf.",
  },
  {
    icon: MessageCircle,
    label: "Expert Consultations",
    description:
      "Book time with Via's skincare team. Real guidance from clinicians who've seen thousands of skin profiles — not a chatbot.",
  },
];

export default function BentoGrid() {
  return (
    <section className="bg-black px-6 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            className="text-white/35 uppercase text-[10px] tracking-[0.2em] font-['Geist_Mono',monospace] mb-3"
          >
            What Via Does
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-['Roundo',sans-serif] font-light text-white"
          >
            Skin health you can measure.
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="flex flex-col gap-4"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Row 1 — wide skin age card */}
          <motion.div variants={fadeUp}>
            <SkinAgeCard />
          </motion.div>

          {/* Row 2 — 3 equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map(({ icon: Icon, label, description }) => (
              <motion.div key={label} variants={fadeUp} className="h-full">
                <MagicCard className="relative h-full min-h-[200px] overflow-hidden">
                  {label === "Your Routine" && <RoutinePlayer />}
                  <div className="relative z-10 flex flex-col gap-4 p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/10 flex items-center justify-center shrink-0">
                        <Icon size={17} className="text-white/50" />
                      </div>
                      {label === "Your Routine" && (
                        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[9px] font-['Geist_Mono',monospace] uppercase tracking-[0.18em] text-white/45 backdrop-blur-md">
                          Live plan
                          <ArrowUpRight size={11} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-['Roundo',sans-serif] font-light text-lg mb-2 leading-snug">
                        {label}
                      </h3>
                      <p className="text-white/40 text-sm font-['Geist_Mono',monospace] leading-relaxed">
                        {description}
                      </p>
                    </div>
                    {label === "Your Routine" && (
                      <div className="mt-auto flex items-center justify-between rounded-2xl border border-white/8 bg-black/25 px-3 py-2 font-['Geist_Mono',monospace] text-[10px] text-white/38 backdrop-blur-sm">
                        <span>Adjusted after your March 14 scan</span>
                        <span className="text-emerald-300/75">+ barrier support</span>
                      </div>
                    )}
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
