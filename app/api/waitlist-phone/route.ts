import { NextResponse } from "next/server";
import { z } from "zod";
import { normalizePhone } from "@/lib/phone";
import { submitWaitlistPhone } from "@/app/actions/submit-signup";

const schema = z.object({
  phone: z
    .string()
    .refine((val) => normalizePhone(val).length === 10, {
      message: "Invalid phone number",
    }),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid phone" },
      { status: 400 }
    );
  }

  const phone = normalizePhone(result.data.phone);

  await submitWaitlistPhone(phone);

  return NextResponse.json({ success: true });
}
