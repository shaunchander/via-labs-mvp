import type { QuestionnaireAnswers } from "./questionnaire.service";

/**
 * Demo personas for prototyping the phone-lookup flow.
 *
 * In the questionnaire's phone-lookup step, type the `phone` value below
 * and hit "Continue" — the contact form will auto-fill with that persona's
 * details. Any unrecognised number will take you to an empty form.
 *
 * Replace this file (or the lookupByPhone stub in questionnaire.service.ts)
 * with a real API call when the backend is ready.
 */
export const PERSONAS: Partial<QuestionnaireAnswers>[] = [
  {
    phone: "4165550142",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@gmail.com",
    dob: "1992-07-18",
    address: "88 Queens Quay W",
    city: "Toronto",
    province: "ON",
    postal: "M5J 0B8",
  },
];
