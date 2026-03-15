"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ShinyText from "./ShinyText";
import { fadeUp, stagger, viewportOnce } from "./animations";
import { PhoneInput } from "./PhoneInput";
import { phoneSchema } from "@/lib/phone";

export default function CTASection() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <section className="bg-black px-6 py-32 md:py-40">
      <motion.div
        className="max-w-xl mx-auto text-center flex flex-col items-center gap-7"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.p
          variants={fadeUp}
          className="text-white/35 uppercase text-sm  tracking-[0.2em] font-['Geist_Mono',monospace]"
        >
          Early Access
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-6xl font-['Roundo',sans-serif] font-light text-white leading-tight"
        >
          Ready to know your skin?
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-white/45 font-['Geist_Mono',monospace] text-sm"
        >
          Join the waitlist. Be first when we launch.
        </motion.p>

        <motion.div variants={fadeUp} className="w-full max-w-md">
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <PhoneInput
                variant="dark"
                className="flex-1 min-w-0"
                value={phone}
                onChange={setPhone}
                placeholder="(416) 555-0142"
              />
              <button
                type="submit"
                className="rounded-full px-8 py-3.5 bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors shrink-0"
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
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-white/40 text-xs font-['Geist_Mono',monospace]"
        >
          No spam. Just your launch notification.
        </motion.p>
      </motion.div>
    </section>
  );
}
