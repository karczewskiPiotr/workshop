import { db } from "@/db";
import { User, emailVerificationCodes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";

export default async function generateEmailVerificationCode(
  userId: User["id"],
  email: User["email"]
) {
  return await db.transaction(async (tx) => {
    await tx
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.userId, userId));

    const code = generateRandomString(8, alphabet("0-9"));

    await tx.insert(emailVerificationCodes).values({
      userId,
      email,
      code,
      expiresAt: createDate(new TimeSpan(15, "m")),
    });

    return code;
  });
}
