"use client";

import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import { useQuestionnaire } from "./questionnaire/QuestionnaireContext";

export function Hero() {
  const { openQuestionnaire } = useQuestionnaire();
  return (
    <section className="relative flex justify-center px-6 py-18">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          {/* <div className="inline-block px-4 py-2 -translate-x-3 bg-slate-50 rounded-full">
            <p className="font-['Geist_Mono',monospace] text-[14px] tracking-[-1.12px] leading-[20px] text-slate-600">
              Via Labs is launching a waitlist
            </p>
          </div> */}

          <h1 className="font-['Roundo_Variable',sans-serif] font-medium text-[48px] lg:text-[64px] tracking-[-0.576px] leading-[48px] lg:leading-[64px] text-slate-900">
            A medical-grade skincare routine that knows you.
          </h1>

          <p className="font-['Geist_Mono',monospace] text-[20px] tracking-[-1.6px] leading-[28px] text-slate-600 max-w-lg">
            Recieve curated skincare samples monthly. Try before you commit to
            full-size products with exclusive savings.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={openQuestionnaire}
              className="group bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px]">
                Start Your Journey
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#how-it-works"
              className="border flex items-center justify-center gap-2 border-slate-200 hover:border-slate-300 text-slate-900 px-8 py-4 rounded-lg transition-all duration-200"
            >
              <span className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px]">
                How It Works
              </span>
            </a>
          </div>

          <div className="flex flex-col gap-3 pt-8 border-t border-slate-100">
            <p className="font-['Geist_Mono',monospace] tracking-[-1.12px] leading-[20px] text-slate-600">
              Join our waitlist.
            </p>
            <div className="space-y-1">
              <p className="space-x-0.5 font-['Roundo_Variable',sans-serif] font-medium text-3xl tracking-[-0.144px] leading-[32px] text-slate-900">
                <span>10,000</span>
                <span>+</span>
              </p>
              <p className="font-['Geist_Mono',monospace] text-xs tracking-[-0.5px] leading-[18px] text-slate-500">
                Members ready to start their skincare journey.
              </p>
            </div>
          </div>
        </div>

        <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1765726951362-df46f5a74cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2tpbmNhcmUlMjBzZXJ1bSUyMGJvdHRsZSUyMG1pbmltYWx8ZW58MXx8fHwxNzcyNDE4NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Medical-grade skincare products"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}
