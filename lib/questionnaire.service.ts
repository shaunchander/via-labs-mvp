import { PERSONAS } from "./personas";

export interface QuestionnaireAnswers {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  city: string;
  province: string;
  postal: string;
  skinType: string;
  primaryConcern: string;
  currentRoutine: string;
  medicalGradeHistory: string;
  skinReaction: string;
  lifestyle: string;
  spfUsage: string;
  consentStoreData: boolean;
  consentAge: boolean;
  consentDeletion: boolean;
}

export interface QuestionnaireService {
  submitAnswers(answers: QuestionnaireAnswers): Promise<void>;
  saveProgress(answers: Partial<QuestionnaireAnswers>): Promise<void>;
  /** Returns the matching persona if the phone is on record, otherwise null. */
  lookupByPhone(
    phone: string
  ): Promise<Partial<QuestionnaireAnswers> | null>;
}

// Stub implementation — replace with real API client later
export const questionnaireService: QuestionnaireService = {
  submitAnswers: async (answers) => {
    console.log("[stub] submit", answers);
  },
  saveProgress: async (answers) => {
    console.log("[stub] persist", answers);
  },
  lookupByPhone: async (phone) => {
    const normalised = phone.replace(/\D/g, "");
    const match = PERSONAS.find(
      (p) => (p.phone ?? "").replace(/\D/g, "") === normalised
    );
    // Simulate a short network round-trip
    await new Promise((r) => setTimeout(r, match ? 600 : 400));
    return match ? { ...match } : null;
  },
};
