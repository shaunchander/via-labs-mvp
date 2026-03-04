"use client";

import React, { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white p-6">
      <span
        className={`font-['Geist_Mono',monospace] tracking-[-1.12px] leading-[20px] text-slate-900 transition-[font-size] duration-300 ${
          scrolled ? "text-base" : "text-2xl"
        }`}
      >
        [VIA LABS]
      </span>
    </nav>
  );
}
