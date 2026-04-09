"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { phoneSchema, formatPhoneDisplay } from "@/lib/phone";

interface PhoneInputProps {
  value: string;
  onChange: (formatted: string) => void;
  autoFocus?: boolean;
  id?: string;
  placeholder?: string;
  variant?: "light" | "dark";
  className?: string;
}

export function PhoneInput({
  value,
  onChange,
  autoFocus,
  id,
  placeholder = "(226) 260-1918",
  variant = "light",
  className,
}: PhoneInputProps) {
  const [touched, setTouched] = useState(false);

  const digits = value.replace(/\D/g, "");
  const isValid = phoneSchema.safeParse(value).success;
  const showError = touched && digits.length > 0 && !isValid;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(formatPhoneDisplay(e.target.value));
  }

  if (variant === "dark") {
    const borderCls = isValid
      ? "border-emerald-400/60"
      : showError
        ? "border-red-400/60"
        : "border-white/12 focus-within:border-white/28";

    return (
      <div className={className}>
        <div
          className={cn(
            "flex items-stretch rounded-full border bg-white/[0.06] backdrop-blur-md overflow-hidden transition-colors",
            borderCls,
          )}
        >
          {/* Country prefix */}
          <div className="flex items-center gap-1.5 pl-5 pr-3.5 border-r border-white/10 shrink-0 select-none">
            <span className="font-['Geist_Mono',monospace] text-[12px] text-white/38 tracking-[-0.2px]">
              +1
            </span>
          </div>

          {/* Input */}
          <input
            id={id}
            type="tel"
            inputMode="numeric"
            autoFocus={autoFocus}
            autoComplete="tel-national"
            value={value}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            placeholder={placeholder}
            className="flex-1 min-w-0 py-3.5 px-4 bg-transparent font-['Geist_Mono',monospace] text-sm text-white placeholder:text-white/22 focus:outline-none"
          />

          {/* Validation icon */}
          {(isValid || showError) && (
            <div className="flex items-center pr-5 shrink-0">
              {isValid && (
                <CheckCircle2 size={15} className="text-emerald-400/80" />
              )}
              {showError && (
                <AlertCircle size={15} className="text-red-400/80" />
              )}
            </div>
          )}
        </div>

        {showError && (
          <p className="mt-1.5 font-['Geist_Mono',monospace] text-[11px] text-red-400/80 tracking-[-0.2px] text-center">
            Enter a valid 10-digit phone number
          </p>
        )}
      </div>
    );
  }

  // ── Light variant ──────────────────────────────────────────────────────────
  const borderCls = isValid
    ? "border-emerald-400 focus-within:border-emerald-500"
    : showError
      ? "border-red-400 focus-within:border-red-500"
      : "border-slate-200 focus-within:border-slate-900";

  return (
    <div className={className}>
      <div
        className={cn(
          "flex items-stretch border rounded-lg overflow-hidden bg-white transition-colors",
          borderCls,
        )}
      >
        {/* Country prefix */}
        <div className="flex items-center gap-1.5 px-3 border-r border-slate-200 bg-slate-50 shrink-0 select-none">
          <span className="font-['Geist_Mono',monospace] text-[13px] text-slate-500 tracking-[-0.2px]">
            +1
          </span>
        </div>

        {/* Input */}
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoFocus={autoFocus}
          autoComplete="tel-national"
          value={value}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          className="flex-1 min-w-0 py-3 px-3.5 font-['Geist_Mono',monospace] text-[14px] tracking-[-0.3px] text-slate-900 placeholder:text-slate-400 focus:outline-none bg-white"
        />

        {/* Validation icon */}
        {(isValid || showError) && (
          <div className="flex items-center pr-3 shrink-0">
            {isValid && <CheckCircle2 size={16} className="text-emerald-500" />}
            {showError && <AlertCircle size={16} className="text-red-400" />}
          </div>
        )}
      </div>

      {showError && (
        <p className="mt-1.5 font-['Geist_Mono',monospace] text-[11px] text-red-500 tracking-[-0.2px]">
          Enter a valid 10-digit phone number
        </p>
      )}
    </div>
  );
}
