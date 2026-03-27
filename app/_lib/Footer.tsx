"use client";

import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-6xl md:text-8xl font-['Roundo',sans-serif] font-light text-white leading-none"
            >
              Via
            </motion.p>
            <p className="text-white/30 font-['Geist_Mono',monospace] text-xs mt-3">
              Skin that knows you.
            </p>
          </div>

          <div className="flex gap-6 md:pb-2">
            <a
              href="#"
              className="text-white/30 hover:text-white/60 transition-colors font-['Geist_Mono',monospace] text-xs"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-white/60 transition-colors font-['Geist_Mono',monospace] text-xs"
            >
              Terms
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <p className="text-white/20 font-['Geist_Mono',monospace] text-xs">
            © 2026 Via. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
