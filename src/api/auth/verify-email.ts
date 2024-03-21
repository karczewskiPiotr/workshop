"use server";

import { lucia } from "@/auth";
import { insertEmailVerificationCodeSchema, users } from "@/db/schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import verifyEmailVerificationCode from "./verify-email-verification-code";
import { db } from "@/db";
import { eq } from "drizzle-orm";

const requestSchema = insertEmailVerificationCodeSchema.pick({ code: true });

export default async function verifyEmail(_prevState: any, formData: FormData) {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return redirect("/login");

  const { user } = await lucia.validateSession(sessionId);
  if (!user) return redirect("/login");

  const code = requestSchema.safeParse({ code: formData.get("code") });
  if (!code.success) return { errors: code.error.errors.map((e) => e.message) };

  const validCode = await verifyEmailVerificationCode(
    user.id,
    user.email,
    code.data.code
  );
  if (!validCode) return { errors: ["Invalid verification code"] };

  await db
    .update(users)
    .set({ emailVerified: true })
    .where(eq(users.id, user.id));

  return redirect("/dashboard");
}
