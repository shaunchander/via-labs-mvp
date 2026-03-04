export type StepType =
  | "card-select"
  | "consent"
  | "phone-lookup"
  | "contact"
  | "summary";

export type CardSelectField =
  | "skinType"
  | "primaryConcern"
  | "currentRoutine"
  | "medicalGradeHistory"
  | "skinReaction"
  | "lifestyle"
  | "spfUsage";

export interface CardOption {
  value: string;
  label: string;
  descriptor?: string;
}

export interface StepConfig {
  id: number;
  type: StepType;
  title: string;
  subtitle?: string;
  field?: CardSelectField;
  options?: CardOption[];
}

export const TOTAL_STEPS = 10; // steps 1–10; step 11 is the summary screen

export const STEPS: StepConfig[] = [
  // ── Skin profile ─────────────────────────────────────────────────────────
  {
    id: 1,
    type: "card-select",
    field: "skinType",
    title: "What's your skin type?",
    options: [
      { value: "normal", label: "Normal", descriptor: "Balanced, minimal concerns" },
      { value: "dry", label: "Dry", descriptor: "Tight, flaky, or dull" },
      {
        value: "oily-combination",
        label: "Oily / Combination",
        descriptor: "Shiny T-zone or breakout-prone",
      },
      {
        value: "sensitive",
        label: "Sensitive",
        descriptor: "Easily irritated or reactive",
      },
    ],
  },
  {
    id: 2,
    type: "card-select",
    field: "primaryConcern",
    title: "What's your primary concern?",
    options: [
      {
        value: "anti-aging",
        label: "Anti-Aging",
        descriptor: "Fine lines, wrinkles, firmness",
      },
      {
        value: "hyperpigmentation",
        label: "Hyperpigmentation",
        descriptor: "Dark spots, uneven tone",
      },
      {
        value: "acne",
        label: "Acne",
        descriptor: "Breakouts, congestion, texture",
      },
      {
        value: "redness",
        label: "Redness",
        descriptor: "Flushing, rosacea, irritation",
      },
      {
        value: "hydration",
        label: "Hydration",
        descriptor: "Dehydrated, lacks moisture",
      },
      {
        value: "brightening",
        label: "Brightening",
        descriptor: "Dull, lacklustre complexion",
      },
    ],
  },
  {
    id: 3,
    type: "card-select",
    field: "currentRoutine",
    title: "How would you describe your current routine?",
    options: [
      { value: "none", label: "None", descriptor: "Starting from scratch" },
      { value: "basic", label: "Basic", descriptor: "Cleanser + moisturizer" },
      {
        value: "intermediate",
        label: "Intermediate",
        descriptor: "Serum, SPF, and more",
      },
      {
        value: "advanced",
        label: "Advanced",
        descriptor: "Actives, layering, treatments",
      },
    ],
  },
  {
    id: 4,
    type: "card-select",
    field: "medicalGradeHistory",
    title: "Have you used medical-grade skincare?",
    options: [
      {
        value: "yes-currently",
        label: "Yes, currently",
        descriptor: "Using prescription or clinical products",
      },
      {
        value: "yes-previously",
        label: "Yes, previously",
        descriptor: "Used in the past",
      },
      { value: "no", label: "No", descriptor: "Never tried it" },
      {
        value: "not-sure",
        label: "Not sure",
        descriptor: "Unsure what qualifies",
      },
    ],
  },
  {
    id: 5,
    type: "card-select",
    field: "skinReaction",
    title: "How does your skin react to new products?",
    options: [
      {
        value: "no-reaction",
        label: "No reaction",
        descriptor: "Tolerates most products well",
      },
      {
        value: "mild",
        label: "Mild",
        descriptor: "Occasional minor irritation",
      },
      {
        value: "sensitive",
        label: "Sensitive",
        descriptor: "Frequently reacts or flares",
      },
      {
        value: "very-reactive",
        label: "Very reactive",
        descriptor: "Almost always reacts",
      },
    ],
  },
  {
    id: 6,
    type: "card-select",
    field: "lifestyle",
    title: "How would you describe your lifestyle?",
    options: [
      {
        value: "urban",
        label: "Urban",
        descriptor: "City living, pollution exposure",
      },
      {
        value: "suburban",
        label: "Suburban",
        descriptor: "Moderate environmental stress",
      },
      {
        value: "outdoor-active",
        label: "Outdoor / Active",
        descriptor: "High sun and nature exposure",
      },
      {
        value: "variable",
        label: "Variable",
        descriptor: "Mix of environments",
      },
    ],
  },
  {
    id: 7,
    type: "card-select",
    field: "spfUsage",
    title: "How often do you use SPF?",
    options: [
      { value: "always", label: "Always", descriptor: "Daily, rain or shine" },
      {
        value: "sometimes",
        label: "Sometimes",
        descriptor: "When I remember or it's sunny",
      },
      { value: "rarely", label: "Rarely", descriptor: "Mostly when outdoors" },
      {
        value: "never",
        label: "Never",
        descriptor: "Haven't made it a habit",
      },
    ],
  },
  // ── Consent ───────────────────────────────────────────────────────────────
  {
    id: 8,
    type: "consent",
    title: "One last thing.",
    subtitle: "Please review and confirm the following before we proceed.",
  },
  // ── Personal info ─────────────────────────────────────────────────────────
  {
    id: 9,
    type: "phone-lookup",
    title: "Let's get your details.",
    subtitle:
      "Enter your phone number and we'll fill in your info. Or skip and enter everything manually.",
  },
  {
    id: 10,
    type: "contact",
    title: "Confirm your details.",
    subtitle: "Review and edit before we finalise your kit.",
  },
  // ── Summary ───────────────────────────────────────────────────────────────
  {
    id: 11,
    type: "summary",
    title: "Here's what we found.",
  },
];

export const CANADIAN_PROVINCES = [
  { value: "AB", label: "Alberta" },
  { value: "BC", label: "British Columbia" },
  { value: "MB", label: "Manitoba" },
  { value: "NB", label: "New Brunswick" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NT", label: "Northwest Territories" },
  { value: "NU", label: "Nunavut" },
  { value: "ON", label: "Ontario" },
  { value: "PE", label: "Prince Edward Island" },
  { value: "QC", label: "Quebec" },
  { value: "SK", label: "Saskatchewan" },
  { value: "YT", label: "Yukon" },
];

export const CONCERN_COLORS: Record<string, { bg: string; text: string }> = {
  "anti-aging": { bg: "bg-amber-100", text: "text-amber-900" },
  hyperpigmentation: { bg: "bg-purple-100", text: "text-purple-900" },
  acne: { bg: "bg-rose-100", text: "text-rose-900" },
  redness: { bg: "bg-red-100", text: "text-red-900" },
  hydration: { bg: "bg-sky-100", text: "text-sky-900" },
  brightening: { bg: "bg-yellow-100", text: "text-yellow-900" },
};

export const SKIN_TYPE_LABELS: Record<string, string> = {
  normal: "Normal",
  dry: "Dry",
  "oily-combination": "Oily / Combination",
  sensitive: "Sensitive",
};

export const CONCERN_LABELS: Record<string, string> = {
  "anti-aging": "Anti-Aging",
  hyperpigmentation: "Hyperpigmentation",
  acne: "Acne",
  redness: "Redness",
  hydration: "Hydration",
  brightening: "Brightening",
};
