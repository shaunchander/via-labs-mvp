'use client';

export function Footer() {
  return (
    <footer className="bg-slate-900 overflow-hidden">
      {/* Copyright bar */}
      <div className="px-8 pt-10 pb-6 flex items-center justify-center">
        <p className="font-['Geist_Mono',monospace] text-[12px] tracking-[0.5px] text-slate-500">
          © 2026 Via Labs Inc. All rights reserved.
        </p>
      </div>

      {/* Giant wordmark fading to bottom */}
      <div className="relative leading-none select-none text-center px-4">
        <p
          className="font-['Geist_Mono',monospace] font-bold text-slate-700 whitespace-nowrap"
          style={{ fontSize: "15.8svw", letterSpacing: "-0.04em" }}
        >
          [VIA LABS]
        </p>
        {/* Gradient fade — bottom half disappears into the background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(15,23,42,0.4) 35%, rgba(15,23,42,0.85) 60%, #0f172a 80%)",
          }}
        />
      </div>
    </footer>
  );
}
