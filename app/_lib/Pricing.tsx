"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useQuestionnaire } from "./questionnaire/QuestionnaireContext";
import { fadeUp, scaleUp, stagger, viewportOnce } from "./animations";
import ShinyText from "./ShinyText";

export function Pricing() {
  const { openQuestionnaire } = useQuestionnaire();
  const features = [
    "5–7 curated medical-grade samples per kit",
    "Personalized routine with instructions",
    "Free shipping across Canada",
    "Exclusive member discounts on full-size products",
  ];

  return (
    <section id="pricing" className="px-6 py-18 bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <h2 className="font-['Roundo_Variable',sans-serif] font-medium text-[30px] lg:text-[48px] tracking-[-0.225px] lg:tracking-[-0.576px] leading-[36px] lg:leading-[48px]">
            Our Transparent Pricing
          </h2>
        </motion.div>

        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="rounded-3xl overflow-hidden border border-white/10"
        >
          {/* Two-panel card */}
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            {/* Left — value story */}
            <div className="bg-[#F8F6F2] p-8 lg:p-10 flex flex-col justify-between gap-8">
              <div>
                <span className="inline-block font-['Geist_Mono',monospace] text-[11px] tracking-[1.5px] uppercase text-stone-500 bg-stone-200/60 px-3 py-1 rounded-full mb-6">
                  One kit · one price
                </span>

                <div className="mb-2">
                  <span className="font-['Roundo_Variable',sans-serif] font-medium text-[72px] lg:text-[80px] tracking-[-0.04em] leading-none text-slate-900">
                    $49
                  </span>
                </div>
                <p className="font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] text-stone-500">
                  CAD + HST
                </p>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <p className="font-['Roundo_Variable',sans-serif] font-medium text-[18px] tracking-[-0.3px] leading-snug text-slate-900 mb-1">
                  Over $200 in samples
                </p>
                <p className="font-['Geist_Mono',monospace] text-[12px] tracking-[-0.3px] leading-[20px] text-stone-500">
                  Medical-grade products curated for your exact skin type and
                  concerns — at a fraction of the retail cost.
                </p>
              </div>
            </div>

            {/* Right — action */}
            <div className="bg-white p-8 lg:p-10 flex flex-col justify-between gap-8">
              <div>
                <p className="font-['Geist_Mono',monospace] text-[11px] tracking-[1.5px] uppercase text-slate-400 mb-5">
                  What&apos;s included
                </p>
                <motion.ul
                  className="space-y-3"
                  variants={stagger(0.07)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                >
                  {features.map((feature) => (
                    <motion.li
                      key={feature}
                      variants={fadeUp}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] leading-[22px] text-slate-700">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div>
                <button
                  onClick={openQuestionnaire}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl transition-all duration-200 mb-3"
                >
                  <ShinyText
                    text="Start Your Journey →"
                    speed={1.5}
                    color="#94a3b8"
                    shineColor="#ffffff"
                    className="font-['Geist_Mono',monospace] text-[14px] tracking-[-0.4px]"
                  />
                </button>
                <p className="font-['Geist_Mono',monospace] text-[11px] tracking-[-0.2px] text-slate-400 text-center">
                  No subscription. No commitment. Just your kit.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
