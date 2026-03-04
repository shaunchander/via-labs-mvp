"use client";

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
