"use server";

import { lucia } from "@/auth";
import { db } from "@/db";
import { insertUserSchema, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

const requestSchema = insertUserSchema.pick({ email: true, password: true });

export default async function login(_prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  const user = requestSchema.safeParse({ email, password });
  if (!user.success) return { errors: user.error.errors.map((e) => e.message) };

  try {
    const [existingUser] = await db
      .select({
        id: users.id,
        emailVerified: users.emailVerified,
        password: users.password,
      })
      .from(users)
      .where(eq(users.email, user.data.email))
      .limit(1);

    if (!existingUser) {
      return { errors: ["Incorrect email or password"] };
    }

    const validPassword = await new Argon2id().verify(
      existingUser.password,
      user.data.password
    );
    if (!validPassword) return { errors: ["Incorrect email or password"] };

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    if (!existingUser.emailVerified) return redirect("/email-verification");
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;

    console.error(error);
    return { errors: ["Something went wrong"] };
  }

  return redirect("/dashboard");
}
