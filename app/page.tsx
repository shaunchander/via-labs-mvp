"use client";

import Hero from "./_lib/Hero";
import Marquee from "./_lib/Marquee";
import BentoGrid from "./_lib/BentoGrid";
import ForewordSection from "./_lib/ForewordSection";
import CTASection from "./_lib/CTASection";
import Footer from "./_lib/Footer";

export default function Page() {
  return (
    <main className="bg-black">
      <Marquee />
      <Hero />
      <BentoGrid />
      <ForewordSection />
      <CTASection />
      <Footer />
    </main>
  );
}
