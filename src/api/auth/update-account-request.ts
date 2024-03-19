"use server";

import { db } from "@/db";
import { Signup, signups } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function updateAccountRequest(
  signupId: Signup["id"],
  status: Signup["status"]
) {
  await db.update(signups).set({ status }).where(eq(signups.id, signupId));

  revalidatePath("/users");
}
