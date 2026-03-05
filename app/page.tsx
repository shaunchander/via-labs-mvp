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
      <div className="min-h-screen bg-slate-50">
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
