"use client";

import React, { useEffect, useState } from "react";
import { useQuestionnaire } from "./questionnaire/QuestionnaireContext";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Mission", href: "#mission" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openQuestionnaire } = useQuestionnaire();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white px-6 py-4 transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <span
          className={`font-['Geist_Mono',monospace] tracking-[-1.12px] leading-[20px] text-slate-900 transition-[font-size] duration-300 ${
            scrolled ? "text-base" : "text-xl"
          }`}
        >
          [VIA LABS]
        </span>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] text-slate-500 hover:text-slate-900 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={openQuestionnaire}
          className="font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-700 transition-colors duration-200"
        >
          Get Your Kit
        </button>
      </div>
    </nav>
  );
}
