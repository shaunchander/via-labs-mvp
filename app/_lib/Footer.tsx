'use client';

import { ArrowRight } from "lucide-react";
import { useQuestionnaire } from "./questionnaire/QuestionnaireContext";

export function Footer() {
  const { openQuestionnaire } = useQuestionnaire();
  return (
    <footer className="bg-slate-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-3xl p-8 lg:p-16 text-white mb-16">
          <div className="max-w-2xl">
            <h2 className="font-['Roundo_Variable',sans-serif] font-medium text-[30px] lg:text-[48px] tracking-[-0.225px] lg:tracking-[-0.576px] leading-[36px] lg:leading-[48px] mb-4">
              Ready to Transform Your Skincare?
            </h2>
            <p className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px] text-slate-400 mb-8">
              Join thousands of Canadians discovering their perfect skincare
              routine
            </p>
            <button
              onClick={openQuestionnaire}
              className="group bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <span className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px]">
                Start Your Journey
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-['Roundo_Variable',sans-serif] font-medium text-[20px] tracking-[-0.1px] leading-[28px] text-slate-900 mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {["How it Works", "Pricing", "Brands", "Sample Box"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-['Geist_Mono',monospace] text-[14px] tracking-[-1.12px] leading-[20px] text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-['Roundo_Variable',sans-serif] font-medium text-[20px] tracking-[-0.1px] leading-[28px] text-slate-900 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-['Geist_Mono',monospace] text-[14px] tracking-[-1.12px] leading-[20px] text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Roundo_Variable',sans-serif] font-medium text-[20px] tracking-[-0.1px] leading-[28px] text-slate-900 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {["Blog", "Skin Guide", "FAQ", "Support"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-['Geist_Mono',monospace] text-[14px] tracking-[-1.12px] leading-[20px] text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Roundo_Variable',sans-serif] font-medium text-[20px] tracking-[-0.1px] leading-[28px] text-slate-900 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Shipping Policy",
                "Returns",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-['Geist_Mono',monospace] text-[14px] tracking-[-1.12px] leading-[20px] text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-['Geist_Mono',monospace] font-medium text-[20px] tracking-[-1.12px] leading-[32px] text-slate-900">
            [VIA LABS]
          </div>
          <p className="font-['Geist_Mono',monospace] text-[14px] tracking-[-1.12px] leading-[20px] text-slate-600">
            © 2026 Via Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
