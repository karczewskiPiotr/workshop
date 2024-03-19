"use server";

import { lucia } from "@/auth";
import { db } from "@/db";
import { insertUserSchema, signups, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

const requestSchema = insertUserSchema.pick({ username: true, password: true });

export default async function login(_prevState: any, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  const user = requestSchema.safeParse({ username, password });
  if (!user.success) return { errors: user.error.errors.map((e) => e.message) };

  let redirectPath = "/";

  try {
    const [existingUser] = await db
      .select({
        id: users.id,
        password: users.password,
        role: users.role,
        status: signups.status,
      })
      .from(users)
      .leftJoin(signups, eq(users.id, signups.userId))
      .where(eq(users.username, user.data.username))
      .limit(1);

    if (!existingUser) {
      return { errors: ["Incorrect username or password"] };
    } else if (existingUser.status === "pending") {
      return { errors: ["Registration is pending verification"] };
    } else if (existingUser.status === "rejected") {
      return { errors: ["Registration has been rejected"] };
    }

    const validPassword = await new Argon2id().verify(
      existingUser.password,
      user.data.password
    );
    if (!validPassword) return { errors: ["Incorrect username or password"] };

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    redirectPath = existingUser.role === "admin" ? "/users" : "/dashboard";
  } catch (error) {
    console.error(error);
    return { errors: ["Something went wrong"] };
  }

  // TODO: Redirect to desired pages based on role
  return redirect(redirectPath);
}
