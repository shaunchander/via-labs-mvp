import { Package, Sparkles, RotateCcw } from "lucide-react";

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
    <section id="how-it-works" className="px-6 py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-['Roundo_Variable',sans-serif] font-medium text-[30px] lg:text-[48px] tracking-[-0.225px] lg:tracking-[-0.576px] leading-[36px] lg:leading-[48px] text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px] text-slate-600">
            Our process to transform your skincare routine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 transition-all duration-200"
            >
              <div className="absolute -top-4 left-8 bg-slate-900 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="font-['Geist_Mono',monospace] text-[14px] tracking-[-1.12px]">
                  {index + 1}
                </span>
              </div>

              <div className="mb-6 mt-4">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-slate-900" />
                </div>
              </div>

              <h3 className="font-['Roundo_Variable',sans-serif] font-medium text-[24px] tracking-[-0.144px] leading-[32px] text-slate-900 mb-3">
                {step.title}
              </h3>

              <p className="font-['Geist_Mono',monospace] text-[16px] tracking-[-1.28px] leading-[28px] text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
