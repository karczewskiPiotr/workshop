"use server";

import { db } from "@/db";
import { insertUserSchema, signups, users } from "@/db/schema";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

const requestSchema = insertUserSchema.pick({ username: true, password: true });

export default async function requestAccount(
  _prevState: any,
  formData: FormData
) {
  const username = formData.get("username");
  const password = formData.get("password");

  const user = requestSchema.safeParse({ username, password });
  if (!user.success) return { errors: user.error.errors.map((e) => e.message) };

  const hashedPassword = await new Argon2id().hash(user.data.password);
  const userId = generateId(15);

  try {
    await db
      .insert(users)
      .values({
        id: userId,
        username: user.data.username,
        password: hashedPassword,
      })
      .onConflictDoNothing({ target: users.id });
  } catch (error: unknown) {
    // TODO: Refactor when Drizzle gets better error handling.
    // https://github.com/drizzle-team/drizzle-orm/issues/376
    // Optimistic assumption but most likely true.
    return { errors: ["Username already taken"] };
  }

  try {
    await db.insert(signups).values({ id: generateId(15), userId });
  } catch (error: unknown) {
    return { errors: ["Something went wrong"] };
  }

  revalidatePath("/users");
  return redirect("/");
}
