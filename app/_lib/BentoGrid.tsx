"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  TrendingDown,
  CalendarDays,
  Package,
  MessageCircle,
} from "lucide-react";
import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import MagicCard from "./MagicCard";
import { fadeUp, stagger, viewportOnce } from "./animations";
import { SkinAgeComposition } from "./remotion/SkinAgeComposition";
import { ProductTrackerComposition } from "./remotion/ProductTrackerComposition";
import { ConsultationComposition } from "./remotion/ConsultationComposition";
import { RoutineComposition } from "./remotion/RoutineComposition";

const BentoPlayer = dynamic(() => import("./remotion/BentoPlayer"), {
  ssr: false,
});

// ─── Masks ───────────────────────────────────────────────────────────────────

// Top-of-card preview: fades in from top edge, fades out into text below
const TOP_MASK: CSSProperties = {
  maskImage:
    "linear-gradient(to bottom, transparent 0%, black 20%, black 62%, transparent 100%), " +
    "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, black 20%, black 62%, transparent 100%), " +
    "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
  WebkitMaskComposite: "source-in",
};

// Right-side preview: fades in from the left (text boundary), fades at top/bottom/right
const RIGHT_MASK: CSSProperties = {
  maskImage:
    "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%), " +
    "linear-gradient(to right, transparent 0%, black 22%, black 88%, transparent 100%)",
  maskComposite: "intersect",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%), " +
    "linear-gradient(to right, transparent 0%, black 22%, black 88%, transparent 100%)",
  WebkitMaskComposite: "source-in",
};

// ─── Shared preview zone ─────────────────────────────────────────────────────

function TopPreview({
  children,
  height,
}: {
  children: React.ReactNode;
  height: number;
}) {
  return (
    <div
      className="saturate-0 group-hover:saturate-100 transition-[filter] duration-500"
      style={{ position: "relative", overflow: "hidden", height, ...TOP_MASK }}
    >
      {children}
    </div>
  );
}

// ─── Cards ───────────────────────────────────────────────────────────────────

// HERO — 2×2, skin age tracker
function SkinAgeCard({ className }: { className?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <MagicCard
      className={`flex flex-col overflow-hidden ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Large preview zone — the composition content looks great at hero scale */}
      <TopPreview height={220}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(100%, 440px)",
          }}
        >
          <BentoPlayer
            component={SkinAgeComposition}
            durationInFrames={240}
            style={{ width: "100%", aspectRatio: "400/310" }}
            playing={hovered}
          />
        </div>
      </TopPreview>

      {/* Content — pushed to bottom */}
      <div className="flex flex-col justify-end flex-1 p-8 pt-5">
        <div className="flex flex-col items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/10 flex items-center justify-center shrink-0">
            <TrendingDown size={17} className="text-white/50" />
          </div>
          <div>
            <h3 className="text-white font-['Roundo',sans-serif] font-light text-xl mb-1.5 leading-snug">
              Skin Age Tracker
            </h3>
            <p className="text-white/38 text-sm font-['Geist_Mono',monospace] leading-relaxed">
              A weekly score based on your skin&apos;s biological age, so you
              can see exactly how your routine is changing things.
            </p>
          </div>
        </div>
      </div>
    </MagicCard>
  );
}

// SMALL — 1×1, stacked: preview on top, text below
function SmallCard({
  icon: Icon,
  label,
  description,
  playerComponent,
  durationInFrames,
  badge,
  footer,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  description: string;
  playerComponent: React.ComponentType;
  durationInFrames: number;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <MagicCard
      className="flex flex-col overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TopPreview height={155}>
        <BentoPlayer
          component={playerComponent}
          durationInFrames={durationInFrames}
          style={{ width: "100%", aspectRatio: "400/310" }}
          playing={hovered}
        />
      </TopPreview>

      <div className="flex flex-col gap-3 p-6 pt-4 flex-1 justify-end">
        <div className="flex items-center justify-between gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/10 flex items-center justify-center shrink-0">
            <Icon size={14} className="text-white/50" />
          </div>
          {badge}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-['Roundo',sans-serif] font-light text-[17px] mb-1.5 leading-snug">
            {label}
          </h3>
          <p className="text-white/36 text-[13px] font-['Geist_Mono',monospace] leading-relaxed">
            {description}
          </p>
        </div>
        {footer}
      </div>
    </MagicCard>
  );
}

// WIDE — full-width horizontal: text left, animation peek on right
function ProductTrackerCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <MagicCard
      className="overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col md:flex-row md:items-stretch min-h-[190px]">
        {/* Text — left side */}
        <div className="flex flex-col justify-center gap-4 p-8 md:max-w-[360px]">
          <div className="w-9 h-9 rounded-xl bg-white/4 border border-white/10 flex items-center justify-center shrink-0">
            <Package size={15} className="text-white/50" />
          </div>
          <div>
            <h3 className="text-white font-['Roundo',sans-serif] font-light text-xl mb-1.5 leading-snug">
              Product Tracker
            </h3>
            <p className="text-white/38 text-sm font-['Geist_Mono',monospace] leading-relaxed">
              Log your current products and see exactly what&apos;s working,
              what&apos;s wasting your money, and where your routine has gaps.
            </p>
          </div>
        </div>

        {/* Animation — right side, peeks in from the right edge */}
        <div
          className="relative flex-1 overflow-hidden min-h-[220px] md:min-h-0 saturate-0 group-hover:saturate-100 transition-[filter] duration-500"
          style={RIGHT_MASK}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "min(100%, 400px)",
            }}
          >
            <BentoPlayer
              component={ProductTrackerComposition}
              durationInFrames={240}
              style={{ width: "100%", aspectRatio: "400/310" }}
              playing={hovered}
            />
          </div>
        </div>
      </div>
    </MagicCard>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

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
            className="text-white/35 uppercase text-sm  tracking-[0.2em] font-['Geist_Mono',monospace] mb-3"
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

        {/*
          Bento layout (3-col custom grid: 2fr | 3fr | 3fr):
          ┌────────────┬──────────┬──────────┐
          │            │ Routine  │ Expert   │
          │  Skin Age  │          │          │
          │  (2fr,     ├──────────┴──────────┤
          │  row 1–2)  │  Product Tracker    │
          │            │  (col 2–3, row 2)   │
          └────────────┴─────────────────────┘
        */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-[3fr_3fr_3fr] gap-4"
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* SkinAge hero — col 1 (2fr), spans 2 rows */}
          <motion.div variants={fadeUp} className="md:row-span-2 flex flex-col">
            <SkinAgeCard className="flex-1" />
          </motion.div>

          {/* Routine — col 3, row 1 */}
          <motion.div variants={fadeUp}>
            <SmallCard
              icon={CalendarDays}
              label="Your Routine"
              description="Personalized morning and evening routines built around your skin type, goals, and the products you already own."
              playerComponent={RoutineComposition}
              durationInFrames={240}
            />
          </motion.div>

          {/* Expert — col 4, row 1 */}
          <motion.div variants={fadeUp}>
            <SmallCard
              icon={MessageCircle}
              label="Tailored Consultations"
              description="Personalized guidance from our team who've reviewed thousands of skin profiles, tailored to your specific concerns."
              playerComponent={ConsultationComposition}
              durationInFrames={240}
            />
          </motion.div>

          {/* Product Tracker — spans cols 3–4, row 2 */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <ProductTrackerCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
