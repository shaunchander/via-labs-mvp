"use client";

import { motion } from "motion/react";
import { QuestionnaireProvider } from "./_lib/questionnaire/QuestionnaireContext";
import { QuestionnaireModal } from "./_lib/questionnaire/QuestionnaireModal";
import { Navbar } from "./_lib/Navbar";
import { Hero } from "./_lib/Hero";
import { HowItWorks } from "./_lib/HowItWorks";
import { SampleShowcase } from "./_lib/SampleShowcase";
import { Pricing } from "./_lib/Pricing";
import { FAQ } from "./_lib/FAQ";
import { Footer } from "./_lib/Footer";

export default function Page() {
  return (
    <QuestionnaireProvider>
      <div className="min-h-screen bg-white">
        <div className="bg-black text-white py-2.5 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: "-50%" }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="mx-12 text-sm font-medium tracking-wide font-['Geist_Mono',monospace]"
              >
                Now accepting waitlist signups
              </span>
            ))}
          </motion.div>
        </div>
        <Navbar />
        <Hero />

        {/* Trust signals strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="border-y border-slate-100 bg-white py-4"
        >
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-8 gap-y-2">
            {[
              "Dermatologist-curated",
              "Medical-grade formulas",
              "Try before you buy",
              "Free shipping across Canada",
            ].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-8">
                <span className="font-['Geist_Mono',monospace] text-[11px] tracking-[1px] uppercase text-slate-400">
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-slate-200 hidden sm:block select-none">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        <HowItWorks />
        <SampleShowcase />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
      <QuestionnaireModal />
    </QuestionnaireProvider>
  );
}
