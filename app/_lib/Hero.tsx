"use client";

import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import { useQuestionnaire } from "./questionnaire/QuestionnaireContext";
import { fadeUp, fadeIn, stagger } from "./animations";
import CountUp from "./CountUp";
import ShinyText from "./ShinyText";

export function Hero() {
  const { openQuestionnaire } = useQuestionnaire();

  return (
    <section className="relative overflow-hidden bg-[#F8F6F2]">
      {/* Grain texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Full-bleed image — desktop only, flush right */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%]"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1765726951362-df46f5a74cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2tpbmNhcmUlMjBzZXJ1bSUyMGJvdHRsZSUyMG1pbmltYWx8ZW58MXx8fHwxNzcyNDE4NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Medical-grade skincare products"
          className="w-full h-full object-cover"
        />
        {/* Blend left edge into hero background */}
        <div className="absolute inset-y-0 left-0 w-48 bg-linear-to-r from-[#F8F6F2] to-transparent pointer-events-none" />
      </motion.div>

      {/* Text content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <motion.div
          className="lg:min-h-[88vh] flex flex-col justify-center py-20 lg:py-0 max-w-[580px] space-y-8"
          variants={stagger(0.1)}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={fadeUp}
            className="font-['Roundo_Variable',sans-serif] font-medium text-[52px] lg:text-[76px] leading-none tracking-[-0.03em] text-slate-900"
          >
            A medical-grade skincare routine that knows you.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="font-['Geist_Mono',monospace] text-[15px] tracking-[-0.4px] leading-[26px] text-slate-500 max-w-md"
          >
            Recieve curated skincare samples monthly. Try before you commit to
            full-size products with exclusive savings.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={openQuestionnaire}
              className="group bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ShinyText
                text="Start Your Journey"
                speed={1.5}
                color="#cbd5e1"
                shineColor="#ffffff"
                className="font-['Geist_Mono',monospace] text-[14px] tracking-[-0.4px]"
              />
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#how-it-works"
              className="border border-slate-200 hover:border-slate-300 bg-white/60 backdrop-blur-sm text-slate-700 px-7 py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              <span className="font-['Geist_Mono',monospace] text-[14px] tracking-[-0.4px]">
                How It Works
              </span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="pt-6 border-t border-slate-200/80"
          >
            <p className="font-['Geist_Mono',monospace] text-[11px] tracking-[1px] uppercase text-slate-400 mb-3">
              Waitlist members
            </p>
            <div className="flex items-baseline gap-0.5">
              <span className="font-['Roundo_Variable',sans-serif] font-medium text-[46px] tracking-[-0.04em] leading-none text-slate-900">
                <CountUp to={500} separator="," duration={1} />
              </span>
              <span className="font-['Roundo_Variable',sans-serif] font-medium text-[46px] tracking-[-0.04em] leading-none text-slate-900">
                +
              </span>
            </div>
            <p className="font-['Geist_Mono',monospace] text-[11px] tracking-[-0.3px] text-slate-400 mt-1.5">
              Members ready to start their skincare journey.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile image — below text on small screens */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="lg:hidden relative h-72 overflow-hidden"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1765726951362-df46f5a74cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2tpbmNhcmUlMjBzZXJ1bSUyMGJvdHRsZSUyMG1pbmltYWx8ZW58MXx8fHwxNzcyNDE4NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Medical-grade skincare products"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
