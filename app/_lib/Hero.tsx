"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ScanFace, Sparkles, ShieldCheck } from "lucide-react";
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
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black"
      style={{ opacity, scale }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2d3f38_0%,#111412_34%,#050505_72%)]" />
        <motion.div
          className="absolute left-[-12%] top-[12%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(201,255,225,0.16),rgba(201,255,225,0))] blur-3xl"
          animate={{ x: [0, 18, -8, 0], y: [0, -12, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-6%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,214,170,0.14),rgba(255,214,170,0))] blur-3xl"
          animate={{ x: [0, -18, 10, 0], y: [0, 10, -14, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_18%,transparent_82%,rgba(255,255,255,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.88))]" />
      </motion.div>

      <div className="noise-overlay z-10" />

      <div className="relative z-20 flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center">
        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/55 backdrop-blur-md"
          initial={{ opacity: 0, y: 12 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-200/80" />
          AI skin analysis for real routines
        </motion.div>

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

        <motion.div
          className="mt-8 flex w-full flex-col items-center gap-5"
          initial={{ opacity: 0, y: 28 }}
          animate={{
            opacity: stage >= 3 ? 1 : 0,
            y: stage >= 3 ? 0 : 28,
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p className="max-w-xl text-balance font-['Geist_Mono',monospace] text-sm leading-relaxed text-white/60 md:text-base">
            Scan your face, grade the products you already own, and get a routine
            that adjusts with weekly progress instead of guesswork.
          </p>

          <div className="grid w-full max-w-3xl gap-3 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-5 text-left backdrop-blur-md">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-['Geist_Mono',monospace] text-[10px] uppercase tracking-[0.24em] text-white/35">
                  Weekly skin signal
                </p>
                <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 font-['Geist_Mono',monospace] text-[10px] text-emerald-100/80">
                  Improving
                </div>
              </div>
              <div className="flex items-end justify-between gap-6">
                <div className="flex flex-col">
                  <p className="font-['Geist_Mono',monospace] text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Skin Age
                  </p>
                  <p className="mt-1 text-5xl leading-none text-white font-['Roundo',sans-serif] font-light">
                    24.3
                  </p>
                  <p className="mt-2 font-['Geist_Mono',monospace] text-[10px] text-emerald-300/75">
                    ↓ 0.7 in the last 7 days
                  </p>
                </div>
                <div className="min-w-28 border-l border-white/10 pl-5">
                  {["Barrier", "Tone", "Breakouts"].map((label, i) => (
                    <div key={label} className="mb-2 last:mb-0">
                      <div className="mb-1 flex items-center justify-between font-['Geist_Mono',monospace] text-[9px] uppercase tracking-[0.18em] text-white/28">
                        <span>{label}</span>
                        <span>{["92", "84", "78"][i]}</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(167,243,208,0.65),rgba(254,240,138,0.65))]"
                          style={{ width: `${[92, 84, 78][i]}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                {
                  icon: ScanFace,
                  title: "Face scans",
                  copy: "Track visible changes with weekly check-ins.",
                },
                {
                  icon: ShieldCheck,
                  title: "Product grading",
                  copy: "See what to keep, replace, or stop buying.",
                },
              ].map(({ icon: Icon, title, copy }) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                    <Icon className="h-4 w-4 text-white/60" />
                  </div>
                  <p className="mb-1 font-['Roundo',sans-serif] text-lg font-light text-white">
                    {title}
                  </p>
                  <p className="font-['Geist_Mono',monospace] text-xs leading-relaxed text-white/45">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 font-['Geist_Mono',monospace] text-[10px] uppercase tracking-[0.2em] text-white/38">
            {["Scan", "Grade", "Consult", "Adjust"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-white/35 font-['Geist_Mono',monospace] text-xs">
            <CountUp to={500} duration={2} startWhen={stage >= 3} />
            <span>+ early members on the waitlist</span>
          </div>

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
