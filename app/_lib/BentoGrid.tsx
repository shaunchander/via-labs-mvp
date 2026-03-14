"use client";

import { motion } from "motion/react";
import { Scan, Layers, Video } from "lucide-react";
import MagicCard from "./MagicCard";
import { fadeUp, stagger, viewportOnce } from "./animations";

const features = [
  {
    icon: Scan,
    label: "Face Scan & Skin Analysis",
    description:
      "AI reads your skin in seconds. Understand your unique skin profile — moisture, texture, concerns — without a dermatologist appointment.",
    wide: true,
  },
  {
    icon: Layers,
    label: "Product Grading",
    description:
      "Ingest your current products. Get a fit score for your skin goals and targeted recommendations for what's missing.",
    wide: false,
  },
  {
    icon: Video,
    label: "Virtual Consultations",
    description:
      "Connect with Via's skincare team for personalized routine guidance from real experts.",
    wide: false,
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
            Your skin, finally understood.
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {features.map(({ icon: Icon, label, description, wide }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className={wide ? "md:col-span-2" : ""}
            >
              <MagicCard className="p-8 h-full min-h-[200px] flex flex-col justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-white/50" />
                  </div>
                  <div>
                    <h3 className="text-white font-['Roundo',sans-serif] font-light text-xl mb-2 leading-snug">
                      {label}
                    </h3>
                    <p className="text-white/40 text-sm font-['Geist_Mono',monospace] leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
