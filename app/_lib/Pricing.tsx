"use client";

import { Check } from "lucide-react";
import { useQuestionnaire } from "./questionnaire/QuestionnaireContext";

export function Pricing() {
  const { openQuestionnaire } = useQuestionnaire();
  const features = [
    "5-7 curated medical-grade samples per kit",
    "Personalized routine with instructions",
    "Free shipping across Canada",
    "Exclusive member discounts on full-size products",
  ];

  return (
    <section className="px-6 py-18 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-['Roundo_Variable',sans-serif] font-medium text-[30px] lg:text-[48px] tracking-[-0.225px] lg:tracking-[-0.576px] leading-[36px] lg:leading-[48px] mb-4">
            Our Transparent Pricing
          </h2>
        </div>

        <div className="bg-white text-slate-900 rounded-3xl p-8 lg:p-12 border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 pb-8 border-b border-slate-200">
            <div>
              <h3 className="font-['Roundo_Variable',sans-serif] font-medium text-[30px] tracking-[-0.225px] leading-[36px]">
                Get your curated samples now
              </h3>
            </div>
            <div className="mt-6 lg:mt-0 text-left lg:text-right">
              <div className="flex items-baseline gap-2">
                <span className="font-['Roundo_Variable',sans-serif] font-medium text-[48px] tracking-[-0.576px] leading-[48px]">
                  $49
                </span>
                <span className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px] text-slate-600">
                  CAD + HST
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px] text-slate-700">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={openQuestionnaire}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg transition-all duration-200"
          >
            <span className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px]">
              Start Your Journey
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
