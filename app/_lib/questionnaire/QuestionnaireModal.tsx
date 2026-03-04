'use client';

import React, { useState, useMemo, useCallback, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { useQuestionnaire } from "./QuestionnaireContext";
import {
  STEPS,
  TOTAL_STEPS,
  CANADIAN_PROVINCES,
  CONCERN_COLORS,
  SKIN_TYPE_LABELS,
  CONCERN_LABELS,
} from "@/lib/questionnaire.config";
import {
  questionnaireService,
  type QuestionnaireAnswers,
} from "@/lib/questionnaire.service";

// ─── Shared styles ───────────────────────────────────────────────────────────

const inputCls =
  "w-full border border-slate-200 rounded-lg px-4 py-3 font-['Geist_Mono',monospace] text-[14px] tracking-[-0.3px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors bg-white";

const labelCls =
  "block font-['Geist_Mono',monospace] text-[11px] tracking-[1px] uppercase text-slate-500 mb-1.5";

// ─── Step components ─────────────────────────────────────────────────────────

function CardSelectStep({
  field,
  options,
  answers,
  setField,
}: {
  field: keyof QuestionnaireAnswers;
  options: { value: string; label: string; descriptor?: string }[];
  answers: Partial<QuestionnaireAnswers>;
  setField: (k: keyof QuestionnaireAnswers, v: string | boolean) => void;
}) {
  const selected = answers[field] as string | undefined;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setField(field, opt.value)}
            className={`text-left p-4 rounded-xl border transition-all duration-150 ${
              isSelected
                ? "bg-slate-900 border-slate-900 text-white"
                : "bg-white border-slate-200 text-slate-900 hover:border-slate-400"
            }`}
          >
            <p
              className={`font-['Roundo_Variable',sans-serif] font-medium text-[15px] tracking-[-0.3px] leading-snug ${
                isSelected ? "text-white" : "text-slate-900"
              }`}
            >
              {opt.label}
            </p>
            {opt.descriptor && (
              <p
                className={`font-['Geist_Mono',monospace] text-[11px] tracking-[-0.2px] mt-1 leading-snug ${
                  isSelected ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {opt.descriptor}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ConsentStep({
  answers,
  setField,
}: {
  answers: Partial<QuestionnaireAnswers>;
  setField: (k: keyof QuestionnaireAnswers, v: string | boolean) => void;
}) {
  const consents = [
    {
      key: "consentStoreData" as const,
      label:
        "I consent to Via Labs storing and processing my skin profile data to curate personalized product recommendations.",
    },
    {
      key: "consentAge" as const,
      label: "I confirm that I am 18 years of age or older.",
    },
    {
      key: "consentDeletion" as const,
      label:
        "I understand that I have the right to request deletion of my data at any time by contacting Via Labs.",
    },
  ];

  return (
    <div className="space-y-4">
      {consents.map(({ key, label }) => {
        const checked = !!answers[key];
        return (
          <button
            key={key}
            type="button"
            onClick={() => setField(key, !checked)}
            className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${
              checked
                ? "border-slate-900 bg-slate-50"
                : "border-slate-200 bg-white hover:border-slate-400"
            }`}
          >
            <div
              className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5 border transition-colors ${
                checked
                  ? "bg-slate-900 border-slate-900"
                  : "bg-white border-slate-300"
              }`}
            >
              {checked && (
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              )}
            </div>
            <span className="font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] leading-[20px] text-slate-700">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PhoneLookupStep({
  answers,
  setField,
  onSkip,
}: {
  answers: Partial<QuestionnaireAnswers>;
  setField: (k: keyof QuestionnaireAnswers, v: string | boolean) => void;
  onSkip: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            className={`${inputCls} pl-10`}
            type="tel"
            placeholder="(416) 555-0142"
            autoFocus
            value={answers.phone ?? ""}
            onChange={(e) => setField("phone", e.target.value)}
          />
        </div>
        <p className="mt-1.5 font-['Geist_Mono',monospace] text-[11px] tracking-[-0.2px] text-slate-400">
          We'll use this to pull your saved details.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="font-['Geist_Mono',monospace] text-[11px] tracking-[1px] uppercase text-slate-400">
          or
        </span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="w-full text-center font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] text-slate-500 hover:text-slate-900 transition-colors py-1"
      >
        Skip — I'll enter my details manually →
      </button>
    </div>
  );
}

function ContactStep({
  answers,
  setField,
}: {
  answers: Partial<QuestionnaireAnswers>;
  setField: (k: keyof QuestionnaireAnswers, v: string | boolean) => void;
}) {
  const computedAge = useMemo(() => {
    if (!answers.dob) return null;
    const dob = new Date(answers.dob);
    if (isNaN(dob.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age >= 0 ? age : null;
  }, [answers.dob]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>First Name</label>
          <input
            className={inputCls}
            placeholder="Jane"
            autoFocus
            value={answers.firstName ?? ""}
            onChange={(e) => setField("firstName", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Last Name</label>
          <input
            className={inputCls}
            placeholder="Smith"
            value={answers.lastName ?? ""}
            onChange={(e) => setField("lastName", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Email</label>
          <input
            className={inputCls}
            type="email"
            placeholder="jane@example.com"
            value={answers.email ?? ""}
            onChange={(e) => setField("email", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Phone</label>
          <input
            className={inputCls}
            type="tel"
            placeholder="(416) 555-0100"
            value={answers.phone ?? ""}
            onChange={(e) => setField("phone", e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className={labelCls}>Date of Birth</label>
        <input
          className={inputCls}
          type="date"
          value={answers.dob ?? ""}
          onChange={(e) => setField("dob", e.target.value)}
        />
        {computedAge !== null && (
          <p className="mt-1.5 font-['Geist_Mono',monospace] text-[12px] tracking-[-0.3px] text-slate-500">
            Age: {computedAge}
          </p>
        )}
      </div>
      <div>
        <label className={labelCls}>Street Address</label>
        <input
          className={inputCls}
          placeholder="123 Main St"
          value={answers.address ?? ""}
          onChange={(e) => setField("address", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>City</label>
          <input
            className={inputCls}
            placeholder="Toronto"
            value={answers.city ?? ""}
            onChange={(e) => setField("city", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls}>Province / Territory</label>
          <select
            className={inputCls}
            value={answers.province ?? ""}
            onChange={(e) => setField("province", e.target.value)}
          >
            <option value="" disabled>
              Select…
            </option>
            {CANADIAN_PROVINCES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-w-[200px]">
        <label className={labelCls}>Postal Code</label>
        <input
          className={inputCls}
          placeholder="M5V 2H1"
          value={answers.postal ?? ""}
          onChange={(e) =>
            setField("postal", e.target.value.toUpperCase())
          }
        />
      </div>
    </div>
  );
}

function SummaryStep({
  answers,
}: {
  answers: Partial<QuestionnaireAnswers>;
}) {
  const skinType = answers.skinType ?? "";
  const concern = answers.primaryConcern ?? "";
  const concernColor = CONCERN_COLORS[concern] ?? {
    bg: "bg-slate-100",
    text: "text-slate-900",
  };

  return (
    <div
      className="rounded-2xl p-8 border border-white/80"
      style={{
        background:
          "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)",
      }}
    >
      <span className="inline-block font-['Geist_Mono',monospace] text-[11px] tracking-[2px] uppercase px-3 py-1 rounded-full bg-slate-200 text-slate-600 mb-5">
        Your Skin Profile
      </span>

      <h3 className="font-['Roundo_Variable',sans-serif] font-medium text-[28px] tracking-[-0.5px] leading-tight text-slate-900 mb-6">
        Here's what we found.
      </h3>

      <div className="flex flex-wrap gap-2 mb-6">
        {skinType && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-900 text-white font-['Geist_Mono',monospace] text-[12px] tracking-[-0.2px]">
            {SKIN_TYPE_LABELS[skinType] ?? skinType} skin
          </span>
        )}
        {concern && (
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full font-['Geist_Mono',monospace] text-[12px] tracking-[-0.2px] ${concernColor.bg} ${concernColor.text}`}
          >
            Focus: {CONCERN_LABELS[concern] ?? concern}
          </span>
        )}
      </div>

      <p className="font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] leading-[22px] text-slate-600">
        We're building your curated routine now. Expect products matched to your
        exact profile — clinical-grade formulations selected by our
        dermatologist team and shipped directly to your door.
      </p>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export function QuestionnaireModal() {
  const { isOpen, closeQuestionnaire } = useQuestionnaire();

  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [answers, setAnswers] = useState<Partial<QuestionnaireAnswers>>({});
  const [submitting, setSubmitting] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);

  // Reset all state when modal closes (after the close animation)
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStepIndex(0);
        setAnswers({});
        setVisible(true);
        setSubmitting(false);
        setLookupLoading(false);
      }, 250);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const setField = useCallback(
    (k: keyof QuestionnaireAnswers, v: string | boolean) => {
      setAnswers((prev) => ({ ...prev, [k]: v }));
    },
    []
  );

  const navigateTo = useCallback((newIndex: number) => {
    setVisible(false);
    setTimeout(() => {
      setStepIndex(newIndex);
      setVisible(true);
    }, 150);
  }, []);

  const step = STEPS[stepIndex];
  const isSummary = step.type === "summary";
  const progressPercent = isSummary
    ? 100
    : ((stepIndex + 1) / TOTAL_STEPS) * 100;

  const canContinue = useMemo(() => {
    switch (step.type) {
      case "card-select":
        return !!(answers as Record<string, unknown>)[step.field!];
      case "consent":
        return !!(
          answers.consentStoreData &&
          answers.consentAge &&
          answers.consentDeletion
        );
      case "phone-lookup":
        return true; // always continuable — phone is optional
      case "contact":
        return !!(
          answers.firstName?.trim() &&
          answers.lastName?.trim() &&
          answers.email?.trim()
        );
      case "summary":
        return true;
      default:
        return false;
    }
  }, [step, answers]);

  const continueLabel = lookupLoading
    ? "Looking up…"
    : submitting
    ? "Submitting…"
    : step.type === "contact"
    ? "Submit & See Results"
    : step.type === "summary"
    ? "Join the Waitlist"
    : "Continue";

  const handleContinue = async () => {
    if (step.type === "phone-lookup") {
      const phone = (answers.phone ?? "").trim();
      if (phone) {
        setLookupLoading(true);
        const result = await questionnaireService.lookupByPhone(phone);
        if (result) {
          // Merge persona into answers (phone already set; persona fills rest)
          setAnswers((prev) => ({ ...prev, ...result }));
        }
        setLookupLoading(false);
      }
      navigateTo(stepIndex + 1);
      return;
    }

    if (step.type === "contact") {
      setSubmitting(true);
      await questionnaireService.submitAnswers(
        answers as QuestionnaireAnswers
      );
      setSubmitting(false);
      navigateTo(stepIndex + 1); // → summary
      return;
    }

    if (step.type === "summary") {
      closeQuestionnaire();
      return;
    }

    navigateTo(stepIndex + 1);
  };

  const handleBack = () => {
    if (stepIndex > 0) navigateTo(stepIndex - 1);
  };

  // "Skip" on the phone-lookup step: clear phone, go straight to contact form
  const handlePhoneSkip = useCallback(() => {
    setAnswers((prev) => ({ ...prev, phone: "" }));
    navigateTo(stepIndex + 1);
  }, [stepIndex, navigateTo]);

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeQuestionnaire();
      }}
    >
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />

        {/* Modal shell */}
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2
            w-[calc(100%-2rem)] max-w-xl max-h-[90vh]
            bg-white rounded-3xl shadow-2xl flex flex-col
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
            duration-200"
        >
          {/* ── Header ─────────────────────────────────────────────────── */}
          <div className="px-8 pt-8 pb-5 flex-shrink-0">
            {/* Progress bar */}
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-slate-900 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Step counter + close button */}
            <div className="flex items-center justify-between">
              <span className="font-['Geist_Mono',monospace] text-[12px] tracking-[-0.3px] text-slate-500">
                {isSummary
                  ? "Complete"
                  : `Step ${stepIndex + 1} of ${TOTAL_STEPS}`}
              </span>

              <DialogPrimitive.Close
                className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </DialogPrimitive.Close>
            </div>
          </div>

          {/* ── Scrollable content ─────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto px-8 pb-2">
            <div
              className="transition-opacity duration-150"
              style={{ opacity: visible ? 1 : 0 }}
            >
              {/* Question title */}
              <DialogPrimitive.Title asChild>
                <h2 className="font-['Roundo_Variable',sans-serif] font-medium text-[26px] sm:text-[30px] tracking-[-0.5px] leading-tight text-slate-900 mb-2">
                  {step.title}
                </h2>
              </DialogPrimitive.Title>

              {step.subtitle ? (
                <p className="font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] leading-[20px] text-slate-500 mb-6">
                  {step.subtitle}
                </p>
              ) : (
                <div className="mb-6" />
              )}

              {/* Step-specific content */}
              {step.type === "card-select" && step.field && step.options && (
                <CardSelectStep
                  field={step.field}
                  options={step.options}
                  answers={answers}
                  setField={setField}
                />
              )}

              {step.type === "consent" && (
                <ConsentStep answers={answers} setField={setField} />
              )}

              {step.type === "phone-lookup" && (
                <PhoneLookupStep
                  answers={answers}
                  setField={setField}
                  onSkip={handlePhoneSkip}
                />
              )}

              {step.type === "contact" && (
                <ContactStep answers={answers} setField={setField} />
              )}

              {step.type === "summary" && <SummaryStep answers={answers} />}

              {/* Bottom spacer so content clears the sticky footer */}
              <div className="h-6" />
            </div>
          </div>

          {/* ── Navigation footer ──────────────────────────────────────── */}
          <div className="px-8 py-5 flex-shrink-0 border-t border-slate-100 flex items-center justify-between gap-3">
            {/* Back */}
            {stepIndex > 0 && !isSummary ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            ) : (
              <div />
            )}

            {/* Continue / Submit / Join */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue || submitting || lookupLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-slate-900 text-white font-['Geist_Mono',monospace] text-[13px] tracking-[-0.3px] transition-all duration-150 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {continueLabel}
              {!submitting && !lookupLoading && !isSummary && (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
