"use server";

import { google } from "googleapis";
import type { QuestionnaireAnswers } from "@/lib/questionnaire.service";

const SPREADSHEET_ID = "1nFAQjOm2SYUlaYsUoFhSzQiE1hO2QD5YPEJLTcog-CY";
const SHEET_NAME = "Signups";

function getAuth() {
  const raw = process.env.GCP_SERVICE_KEY;
  if (!raw) throw new Error("GCP_SERVICE_KEY is not set");

  const key = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: key.client_email,
      private_key: key.private_key,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function submitWaitlistPhone(phone: string): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Waitlist!A:B",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[new Date().toISOString(), phone]] },
  });
}

export async function submitSignup(
  answers: QuestionnaireAnswers
): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toISOString(),
    answers.firstName,
    answers.lastName,
    answers.email,
    answers.phone ?? "",
    answers.dob ?? "",
    answers.address ?? "",
    answers.city ?? "",
    answers.province ?? "",
    answers.postal ?? "",
    answers.skinType ?? "",
    answers.primaryConcern ?? "",
    answers.currentRoutine ?? "",
    answers.medicalGradeHistory ?? "",
    answers.skinReaction ?? "",
    answers.lifestyle ?? "",
    answers.spfUsage ?? "",
    answers.consentStoreData ? "Yes" : "No",
    answers.consentAge ? "Yes" : "No",
    answers.consentDeletion ? "Yes" : "No",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:T`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}
