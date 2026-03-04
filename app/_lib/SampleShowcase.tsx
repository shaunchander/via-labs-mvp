"use client";

import React, { useState } from "react";

type Section = "Medical-Grade" | "Affordable Access" | "Curated Kits";

const sections: Section[] = [
  "Medical-Grade",
  "Affordable Access",
  "Curated Kits",
];

type CardContent = {
  eyebrow: string;
  headline: string;
  stats: { value: string; label: string }[];
  leftLabel: string;
  left: string;
  rightLabel: string;
  right: string;
  gradient: string;
  accentText: string;
  statText: string;
  tagBg: string;
  tagText: string;
};

const cardContent: Record<Section, CardContent> = {
  "Medical-Grade": {
    eyebrow: "Clinical vs. Consumer",
    headline: "Most consumer-grade skincare isn't effective. Medical-grade is.",
    stats: [
      { value: "10×", label: "Active Ingredients concentration" },
      {
        value: "<1%",
        label: "Active ingredients in most drugstore products",
      },
      { value: "92%", label: "More patients see results" },
    ],
    leftLabel: "What You're Actually Buying at the Drugstore",
    left: "To keep everyone happy and avoid irritation, brands use tiny amounts of active ingredients. The result? You're mostly paying for nice packaging and fragrance, not real results.",
    rightLabel: "What Dermatologists Actually Reccommend",
    right:
      "Via Labs samples the same clinical-grade products that you can find at a dermatologist's office. These have the ingredient concentrations that show up in research.",
    gradient: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 50%, #7c8fa3 100%)",
    accentText: "text-slate-900",
    statText: "text-slate-900",
    tagBg: "bg-slate-700",
    tagText: "text-slate-100",
  },
  "Affordable Access": {
    eyebrow: "Stop Wasting Money",
    headline: "A full skincare routine can cost $500. Most of it won't work.",
    stats: [
      { value: "$500+", label: "Avg. cost to build a full routine" },
      { value: "7+", label: "Products tried before finding a fit" },
      { value: "$0", label: "Wasted on full-size products with no gaurantee" },
    ],
    leftLabel: "The expensive guessing game",
    left: "Building a complete routine, cleanser, retinol, Vitamin C serum, eye cream, moisturizer, SPF, can easily run you over $500. And there's no guarantee any of it will work for your skin. Most people end up with a drawer full of half-used products and still no real results to show for it.",
    rightLabel: "Try it first, then decide",
    right:
      "Via Labs sends you samples of medical-grade products matched to your skin. Try them out before spending anything on full sizes. If something works, great, we'll get you exclusive offers. If not, you haven't thrown away $150 on a bottle that wasn't right for you. It's the smarter way to build a skincare routine.",
    gradient: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 50%, #7c8fa3 100%)",
    accentText: "text-slate-900",
    statText: "text-slate-900",
    tagBg: "bg-slate-700",
    tagText: "text-slate-100",
  },
  "Curated Kits": {
    eyebrow: "Built For Your Skin",
    headline:
      "Answer a few questions. Get a curated routine. No research required.",
    stats: [
      { value: "5 min", label: "To complete your skin test" },
      { value: "10+", label: "Products evaluated per category" },
      { value: "100%", label: "Derm-recommended products, in every kit" },
    ],
    leftLabel: "Researching skincare is exhausting",
    left: "Between countless hours online, conflicting ingredient advice, and brand marketing, figuring out what products actually work together for your skin takes hours, sometimes weeks. Most people still end up guessing. And guessing gets expensive fast.",
    rightLabel: "We've already done the work",
    right:
      "Fill out our cureated test to tell us about your skin type, concerns, and goals. Via Labs then builds your routine for you. We've evaluated hundreds of brands, mapped ingredient interactions, and matched everything to your profile using clinical research. What arrives in your box is a complete, sequenced routine, backed by science.",
    gradient: "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 50%, #7c8fa3 100%)",
    accentText: "text-slate-900",
    statText: "text-slate-900",
    tagBg: "bg-slate-700",
    tagText: "text-slate-100",
  },
};

export function SampleShowcase() {
  const [active, setActive] = useState<Section>("Medical-Grade");
  const [visible, setVisible] = useState(true);

  const handleSelect = (section: Section) => {
    if (section === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(section);
      setVisible(true);
    }, 120);
  };

  const card = cardContent[active];

  return (
    <section className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-['Roundo_Variable',sans-serif] font-medium text-[30px] lg:text-[48px] tracking-[-0.225px] lg:tracking-[-0.576px] leading-[36px] lg:leading-[48px] text-slate-900 mb-4">
            Everyone Should Feel Confident in Their Skin
          </h2>
          <p className="font-['Geist_Mono',monospace] text-[14px] tracking-[-0.5px] leading-[24px] text-slate-500">
            We're on a mission to make medical-grade skincare accessible
            everyone.
          </p>
        </div>

        {/* 3-section pill group */}
        <div className="flex justify-center gap-3 mb-10">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => handleSelect(section)}
              className={`px-6 py-2.5 rounded-full font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] transition-all duration-200 ${
                active === section
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Content card */}
        <div
          className={`rounded-3xl p-10 lg:p-14 border border-white/80 shadow-sm transition-opacity duration-150 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: card.gradient }}
        >
          {/* Eyebrow */}
          <span
            className={`inline-block font-['Geist_Mono',monospace] text-[11px] tracking-[2px] uppercase px-3 py-1 rounded-full mb-6 ${card.tagBg} ${card.tagText}`}
          >
            {card.eyebrow}
          </span>

          {/* Headline — Roundo, large */}
          <h3
            className={`font-['Roundo_Variable',sans-serif] font-medium text-[38px] lg:text-[56px] tracking-[-1.5px] leading-[1.05] mb-12 whitespace-pre-line ${card.accentText}`}
          >
            {card.headline}
          </h3>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {card.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/60 rounded-2xl p-5 backdrop-blur-sm"
              >
                <div
                  className={`font-['Roundo_Variable',sans-serif] font-semibold text-[34px] tracking-[-1.5px] leading-none mb-2 ${card.statText}`}
                >
                  {stat.value}
                </div>
                <div className="font-['Geist_Mono',monospace] text-[11px] tracking-[0.2px] text-slate-500 uppercase leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Two-panel body */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-2xl p-6 backdrop-blur-sm">
              <p
                className={`capitalize font-['Roundo_Variable',sans-serif] font-medium text-[17px] tracking-[-0.4px] leading-snug mb-3 ${card.accentText}`}
              >
                {card.leftLabel}
              </p>
              <p className="font-['Geist_Mono',monospace] text-[13px] leading-[22px] tracking-[-0.3px] text-slate-600">
                {card.left}
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl p-6 backdrop-blur-sm">
              <p
                className={`capitalize font-['Roundo_Variable',sans-serif] font-medium text-[17px] tracking-[-0.4px] leading-snug mb-3 ${card.accentText}`}
              >
                {card.rightLabel}
              </p>
              <p className="font-['Geist_Mono',monospace] text-[13px] leading-[22px] tracking-[-0.3px] text-slate-600">
                {card.right}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
