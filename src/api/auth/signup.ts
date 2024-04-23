"use server";

import { db } from "@/db";
import { insertUserSchema, users } from "@/db/schema";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import sendEmailVerificationcode from "./send-email-verification-code";

const requestSchema = insertUserSchema.pick({
  email: true,
  name: true,
  surname: true,
  password: true,
});

export default async function signup(_prevState: any, formData: FormData) {
  const user = requestSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    surname: formData.get("surname"),
    password: formData.get("password"),
  });
  if (!user.success) return { errors: user.error.errors.map((e) => e.message) };

  const hashedPassword = await new Argon2id().hash(user.data.password);
  const userId = generateId(15);

  try {
    await db
      .insert(users)
      .values({ ...user.data, id: userId, password: hashedPassword });
  } catch (error: unknown) {
    // TODO: Refactor when Drizzle gets better error handling.
    // https://github.com/drizzle-team/drizzle-orm/issues/376
    // Optimistic assumption but most likely true.
    return { errors: ["Email already taken"] };
  }

  try {
    await sendEmailVerificationcode(userId, user.data.email);
  } catch (error: unknown) {
    return { errors: ["Could not send verification code"] };
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/email-verification");
}
