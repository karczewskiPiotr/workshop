"use server";

import { db } from "@/db";
import { insertSignupSchema, signups } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export default async function approve(
  signupId: z.infer<typeof insertSignupSchema>["id"]
) {
  await db
    .update(signups)
    .set({ status: "approved" })
    .where(eq(signups.id, signupId));

  revalidatePath("/users");
}
