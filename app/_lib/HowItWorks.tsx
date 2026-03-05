"use client";

import { Package, Sparkles, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, stagger, viewportOnce } from "./animations";

export function HowItWorks() {
  const steps = [
    {
      icon: Sparkles,
      title: "Complete Your Profile",
      description:
        "Take our curated test so we can learn more about your routine, concerns, and skincare goals.",
    },
    {
      icon: Package,
      title: "Get Your Custom Sample Kit",
      description:
        "We'll send you up to 6 medical-grade skincare samples every month along with instructions on how to use them.",
    },
    {
      icon: RotateCcw,
      title: "Try & Decide",
      description:
        "After trying your samples, get full-size versions of your favorite ones with exclusive discounts from Via Labs.",
    },
  ];

  return (
    <section id="how-it-works" className="px-6 py-18 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.h2
            variants={fadeUp}
            className="font-['Roundo_Variable',sans-serif] font-medium text-[30px] lg:text-[48px] tracking-[-0.225px] lg:tracking-[-0.576px] leading-[36px] lg:leading-[48px] text-white mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px] text-slate-400"
          >
            Our process to transform your skincare routine.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="relative bg-white/[0.07] rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="absolute -top-4 left-8 bg-white text-slate-900 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="font-['Geist_Mono',monospace] text-[14px] tracking-[-1.12px]">
                  {index + 1}
                </span>
              </div>

              <div className="mb-6 mt-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="font-['Roundo_Variable',sans-serif] font-medium text-[24px] tracking-[-0.144px] leading-[32px] text-white mb-3">
                {step.title}
              </h3>

              <p className="font-['Geist_Mono',monospace] text-[15px] tracking-[-1.28px] leading-[28px] text-slate-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
