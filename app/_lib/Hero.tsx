"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ShinyText from "./ShinyText";
import CountUp from "./CountUp";

type Stage = 0 | 1 | 2 | 3;

export default function Hero() {
  const [stage, setStage] = useState<Stage>(0);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);

  // Lock scroll during intro, unlock when content is ready
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setStage(1), 1000),
      setTimeout(() => setStage(2), 2500),
      setTimeout(() => setStage(3), 4500),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (stage >= 3) document.body.style.overflow = "";
  }, [stage]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!phone.trim()) return;
    console.log("[via] waitlist signup:", phone);
    setSubmitted(true);
  }

  return (
    <motion.section
      ref={heroRef}
      className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Video background — fades in at stage 2 */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        {/* Add a video src here — e.g. a Mixkit or Pexels free video URL */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover mix-blend-overlay opacity-50"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        />
        {/* Fallback gradient — always visible */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,#1c1c2e_0%,#000000_75%)]" />
      </motion.div>

      {/* Noise grain */}
      <div className="noise-overlay z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl w-full">
        {/* Stage 1 — "Meet Via" spins up word by word like a picker wheel */}
        <h1
          className="text-[clamp(5rem,14vw,11rem)] font-['Roundo',sans-serif] font-light leading-[0.9] tracking-tight flex gap-[0.25em]"
          style={{ perspective: "800px", perspectiveOrigin: "50% 100%" }}
        >
          <motion.span
            className="inline-block text-white/90"
            style={{ transformOrigin: "50% 100%" }}
            initial={{ rotateX: 74, opacity: 0, y: "0.4em" }}
            animate={stage >= 1 ? { rotateX: 0, opacity: 1, y: "0em" } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
          >
            Meet
          </motion.span>
          <motion.span
            className="inline-block text-transparent bg-clip-text bg-linear-to-br from-slate-200 via-slate-300 to-slate-500"
            style={{ transformOrigin: "50% 100%" }}
            initial={{ rotateX: 74, opacity: 0, y: "0.4em" }}
            animate={stage >= 1 ? { rotateX: 0, opacity: 1, y: "0em" } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1], delay: 0.18 }}
          >
            Via
          </motion.span>
        </h1>

        {/* Stage 3 — subheadline, stats, CTA */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-5 w-full"
          initial={{ opacity: 0, y: 28 }}
          animate={{
            opacity: stage >= 3 ? 1 : 0,
            y: stage >= 3 ? 0 : 28,
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p className="text-white/55 text-base max-w-sm font-['Geist_Mono',monospace] leading-relaxed">
            A routine built for your skin.
            <br />A weekly score that proves it&apos;s working.
          </p>

          {/* Skin age preview widget — Zeigarnik open loop: "what's MY number?" */}
          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-sm">
            <div className="flex flex-col">
              <p className="text-white/30 font-['Geist_Mono',monospace] text-[9px] tracking-[0.2em] uppercase">
                Skin Age
              </p>
              <p className="text-white text-4xl font-['Roundo',sans-serif] font-light leading-none mt-1">
                24.3
              </p>
              <p className="text-emerald-400/70 font-['Geist_Mono',monospace] text-[10px] mt-1.5">
                ↓ 0.7 from last week
              </p>
            </div>
            <div className="border-l border-white/10 pl-5 flex flex-col gap-1">
              {["25.0", "24.8", "24.5", "24.3"].map((val, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-white/20 font-['Geist_Mono',monospace] text-[9px]">
                    Wk {i + 1}
                  </span>
                  <span
                    className={`font-['Geist_Mono',monospace] text-[10px] ${
                      i === 3 ? "text-white/80" : "text-white/30"
                    }`}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-1.5 text-white/35 font-['Geist_Mono',monospace] text-xs">
            <CountUp to={500} duration={2} startWhen={stage >= 3} />
            <span>+ early members on the waitlist</span>
          </div>

          {/* Phone input */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="flex-1 rounded-full px-6 py-3.5 bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 font-['Geist_Mono',monospace] text-sm"
              />
              <button
                type="submit"
                className="rounded-full px-7 py-3.5 bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors shrink-0"
              >
                <ShinyText
                  text="Join Waitlist"
                  color="#111111"
                  shineColor="#555555"
                  speed={3}
                />
              </button>
            </form>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/75 font-['Geist_Mono',monospace] text-sm"
            >
              You&apos;re on the list 🎉
            </motion.p>
          )}

          <p className="text-white/25 text-xs font-['Geist_Mono',monospace]">
            No spam. Just your launch notification.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 3 ? 0.6 : 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="w-px h-8 bg-linear-to-b from-transparent to-white/30" />
        <motion.div
          className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <motion.div
            className="w-0.5 h-1.5 bg-white/50 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
