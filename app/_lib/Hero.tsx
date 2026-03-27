"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import { Sparkles } from "lucide-react";
import { Player } from "@remotion/player";
import { SkinAgeComposition, RULER_DURATION } from "./SkinAgeComposition";
import { PhoneInput } from "./PhoneInput";
import { phoneSchema } from "@/lib/phone";

// ─── Magnetic CTA button ─────────────────────────────────────────────────────

function MagneticButton({
  children,
  type = "button",
  className,
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 15 });
  const sy = useSpring(my, { stiffness: 150, damping: 15 });

  function onMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

type Stage = 0 | 1 | 2 | 3;

const H1_WORDS = [
  { word: "Meet", delay: 0, accent: false },
  { word: "Via.", delay: 0.18, accent: true },
];

export default function Hero() {
  const [stage, setStage] = useState<Stage>(0);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax: content drifts up slowly, section stays fully visible until
  // the user has scrolled 50% of the hero height, then fades to black.
  const contentY = useTransform(scrollYProgress, [0.5, 0.85], ["0%", "-6%"]);
  const heroOpacity = useTransform(scrollYProgress, [0.5, 0.82], [1, 0]);

  // Orchestrated entrance: lock scroll, stage through on timers
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setStage(1), 500), // H1 starts
      setTimeout(() => setStage(2), 1500), // background + eyebrow
      setTimeout(() => setStage(3), 2900), // subhead, proof, CTA
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (stage >= 3) document.body.style.overflow = "";
  }, [stage]);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!phoneSchema.safeParse(phone).success) return;
    fetch("/api/waitlist-phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    }).catch(() => null);
    setSubmitted(true);
  }

  return (
    <motion.section
      ref={heroRef}
      className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-black"
      style={{ opacity: heroOpacity }}
    >
      {/* ── Ambient background ────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 2 ? 1 : 0 }}
        transition={{ duration: 2.6, ease: "easeInOut" }}
      >
        {/* Deep green radial — skin health, nature */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-5%,#1b2e24_0%,#050707_65%)]" />

        {/* Orb: top-left, soft sage */}
        <motion.div
          className="absolute -left-[12%] top-[8%] h-128 w-128 rounded-full bg-[radial-gradient(circle,rgba(134,239,172,0.09),transparent_68%)] blur-3xl"
          animate={{ x: [0, 24, -12, 0], y: [0, -18, 14, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orb: bottom-right, warm amber */}
        <motion.div
          className="absolute -bottom-[14%] -right-[8%] h-112 w-112 rounded-full bg-[radial-gradient(circle,rgba(251,191,114,0.08),transparent_68%)] blur-3xl"
          animate={{ x: [0, -22, 16, 0], y: [0, 16, -20, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Edge vignette */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,transparent_20%,transparent_78%,rgba(0,0,0,0.9)_100%)]" />
      </motion.div>

      {/* Grain */}
      <div className="noise-overlay z-10" />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-20 flex w-full max-w-2xl flex-col items-center px-6 text-center"
        style={{ y: contentY }}
      >
        {/* Eyebrow badge */}
        <motion.div
          className="font-['Geist_Mono',monospace] mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/48 backdrop-blur-md"
          initial={{ opacity: 0, y: 10 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Sparkles className="h-3 w-3 text-emerald-300/55" />
          Launching soon
        </motion.div>

        {/* H1 — word-by-word blur + rotateX reveal */}
        <div style={{ perspective: "900px", perspectiveOrigin: "50% 100%" }}>
          <h1 className="font-['Roundo',sans-serif] font-light leading-[0.88] tracking-tight text-[clamp(4rem,13vw,9.5rem)]">
            {H1_WORDS.map(({ word, delay, accent }) => (
              <motion.span
                key={word}
                className={`inline-block mr-[0.22em] last:mr-0 ${
                  accent
                    ? "text-transparent bg-clip-text bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500"
                    : "text-white/90"
                }`}
                style={{ transformOrigin: "50% 100%" }}
                initial={{
                  rotateX: 70,
                  opacity: 0,
                  filter: "blur(8px)",
                  y: "0.3em",
                }}
                animate={
                  stage >= 1
                    ? { rotateX: 0, opacity: 1, filter: "blur(0px)", y: "0em" }
                    : {}
                }
                transition={{
                  duration: 1.0,
                  ease: [0.25, 0.4, 0.25, 1],
                  delay,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Skin-age ruler */}
        <motion.div
          className="mt-8 w-full max-w-[400px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={stage >= 3 ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <Player
            component={SkinAgeComposition}
            durationInFrames={RULER_DURATION}
            fps={30}
            compositionWidth={500}
            compositionHeight={175}
            loop
            autoPlay
            style={{ width: "100%", height: 175, opacity: 0.88 }}
          />
        </motion.div>

        {/* Subhead */}

        <motion.p
          className="mt-5 max-w-[400px] text-balance font-['Geist_Mono',monospace] leading-relaxed text-white/48"
          initial={{ opacity: 0, y: 16 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          The app that tracks your skin health — start aging backwards.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8 flex w-full flex-col items-center gap-3"
          initial={{ opacity: 0, y: 22 }}
          animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.75,
            ease: [0.25, 0.4, 0.25, 1],
            delay: 0.3,
          }}
        >
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col gap-2.5 sm:flex-row sm:gap-3"
            >
              <PhoneInput
                variant="dark"
                className="flex-1 min-w-0"
                value={phone}
                onChange={setPhone}
              />
              <MagneticButton
                type="submit"
                className="shrink-0 cursor-pointer rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-40"
              >
                Join waitlist
              </MagneticButton>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-full border border-emerald-300/22 bg-emerald-300/[0.07] px-6 py-3.5 font-['Geist_Mono',monospace] text-emerald-100/75"
            >
              You&apos;re on the list. We&apos;ll be in touch.
            </motion.div>
          )}

          <p className="font-['Geist_Mono',monospace] text-xs text-white/40">
            Sign up for early access. We&apos;ll reach out when we&apos;re ready
            to launch.
          </p>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ──────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 3 ? 0.45 : 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        <div className="h-8 w-px bg-gradient-to-b from-transparent to-white/24" />
        <motion.div
          className="flex h-7 w-4 items-start justify-center rounded-full border border-white/18 pt-1.5"
          animate={{ opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          <motion.div
            className="h-1.5 w-0.5 rounded-full bg-white/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.6, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
