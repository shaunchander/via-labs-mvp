"use client";

import { motion } from "motion/react";
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

// ─── Shared card content block ────────────────────────────────────────────────
// Mobile: uniform sizing across all cards.
// md+: each card variant can layer responsive overrides via className props.

function CardContent({
  icon: Icon,
  label,
  description,
  badge,
  footer,
  // Responsive overrides — callers pass md: classes to restore desktop sizing
  iconClassName = "",
  headingClassName = "",
  bodyClassName = "",
  wrapperClassName = "",
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  description: string;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  iconClassName?: string;
  headingClassName?: string;
  bodyClassName?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${wrapperClassName}`}>
      <div className="flex items-center justify-between gap-3">
        {/* Icon — mobile baseline: w-8 h-8 rounded-lg size-14 */}
        <div
          className={`w-8 h-8 rounded-lg bg-white/4 border border-white/10 flex items-center justify-center shrink-0 ${iconClassName}`}
        >
          <Icon size={14} className="text-white/50" />
        </div>
        {badge}
      </div>

      <div>
        {/* Heading — mobile baseline: text-[17px] */}
        <h3
          className={`text-white font-['Roundo',sans-serif] font-light text-[17px] mb-1.5 leading-snug ${headingClassName}`}
        >
          {label}
        </h3>
        {/* Body — mobile baseline: text-[13px] */}
        <p
          className={`text-white/38 text-[13px] font-['Geist_Mono',monospace] leading-relaxed ${bodyClassName}`}
        >
          {description}
        </p>
      </div>

      {footer}
    </div>
  );
}

// ─── Cards ───────────────────────────────────────────────────────────────────

function SkinAgeCard({ className }: { className?: string }) {
  return (
    <MagicCard className={`flex flex-col overflow-hidden ${className ?? ""}`}>
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
            durationInFrames={420}
            style={{ width: "100%", aspectRatio: "400/310" }}
          />
        </div>
      </TopPreview>

      <div className="flex flex-col justify-end flex-1 p-6 pt-4 md:p-8 md:pt-5">
        <CardContent
          icon={TrendingDown}
          label="Skin Age Tracker"
          description="A weekly score based on your skin's biological age, so you can see exactly how your routine is changing things."
          iconClassName="md:w-10 md:h-10 md:rounded-xl"
          headingClassName="md:text-xl"
          bodyClassName="md:text-sm"
        />
      </div>
    </MagicCard>
  );
}

function SmallCard({
  icon,
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
  return (
    <MagicCard className="flex flex-col overflow-hidden">
      <TopPreview height={155}>
        <BentoPlayer
          component={playerComponent}
          durationInFrames={durationInFrames}
          style={{ width: "100%", aspectRatio: "400/310" }}
        />
      </TopPreview>

      <div className="flex flex-col p-6 pt-4 flex-1 justify-end">
        <CardContent
          icon={icon}
          label={label}
          description={description}
          badge={badge}
          footer={footer}
        />
      </div>
    </MagicCard>
  );
}

function ProductTrackerCard() {
  return (
    <MagicCard className="overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-stretch min-h-[190px]">
        {/* Text — bottom on mobile (order-2), left on desktop */}
        <div className="order-2 flex flex-col justify-center p-6 md:p-8 md:max-w-[360px]">
          <CardContent
            icon={Package}
            label="Product Tracker"
            description="Log your current products and see exactly what's working, what's wasting your money, and where your routine has gaps."
            iconClassName="md:w-9 md:h-9 md:rounded-xl"
            headingClassName="md:text-xl"
            bodyClassName="md:text-sm"
          />
        </div>

        {/* Animation — top on mobile (order-1), right on desktop */}
        <div
          className="order-1 relative flex-1 overflow-hidden min-h-[220px] md:min-h-0 saturate-0 group-hover:saturate-100 transition-[filter] duration-500"
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
    <section className="bg-black px-4 md:px-6 py-20 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14 text-center"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            className="text-white/35 uppercase text-xs md:text-sm tracking-[0.2em] font-['Geist_Mono',monospace] mb-3"
          >
            A Glimpse Into Via
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-['Roundo',sans-serif] font-light text-white"
          >
            Skin health you
            <br className="md:hidden" /> can measure
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-[3fr_3fr_3fr] gap-3 md:gap-4"
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* SkinAge — col 1, spans 2 rows on desktop */}
          <motion.div variants={fadeUp} className="md:row-span-2 flex flex-col">
            <SkinAgeCard className="flex-1" />
          </motion.div>

          {/* Routine */}
          <motion.div variants={fadeUp}>
            <SmallCard
              icon={CalendarDays}
              label="Your Routine"
              description="Personalized morning and evening routines built around your skin type, goals, and the products you already own."
              playerComponent={RoutineComposition}
              durationInFrames={240}
            />
          </motion.div>

          {/* Consultations */}
          <motion.div variants={fadeUp}>
            <SmallCard
              icon={MessageCircle}
              label="Tailored Consultations"
              description="Personalized guidance from our team who've reviewed thousands of skin profiles, tailored to your specific concerns."
              playerComponent={ConsultationComposition}
              durationInFrames={240}
            />
          </motion.div>

          {/* Product Tracker — spans cols 2–3 on desktop */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <ProductTrackerCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
