"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, stagger, viewportOnce } from "./animations";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What makes your samples medical-grade?",
      answer:
        "All our products are sourced from dermatologist-approved brands with clinical formulations. They contain active ingredients at therapeutic concentrations, similar to what you'd receive at a dermatology clinic.",
    },
    {
      question: "How do you personalize my samples?",
      answer:
        "Our curated skin test analyzes your skin type, concerns, and goals. Our team then matches you with products specifically suited to your needs, updated monthly based on your feedback.",
    },
    {
      question: "Can I purchase full-size products?",
      answer:
        "Absolutely! Members get exclusive discounts on full-size versions of any sample they've received. Simply browse our provided discount links after receiving your first box.",
    },
    {
      question: "What's your shipping policy?",
      answer: "Free shipping to all Canadian addresses.",
    },
  ];

  return (
    <section id="faq" className="px-6 py-18">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.h2
            variants={fadeUp}
            className="font-['Roundo_Variable',sans-serif] font-medium text-[30px] lg:text-[48px] tracking-[-0.225px] lg:tracking-[-0.576px] leading-[36px] lg:leading-[48px] text-slate-900 mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px] text-slate-600"
          >
            Everything you need to know about Via Labs.
          </motion.p>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-slate-300 transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="font-['Roundo_Variable',sans-serif] font-medium text-[20px] tracking-[-0.1px] leading-[28px] text-slate-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-slate-900 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-900 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px] text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
