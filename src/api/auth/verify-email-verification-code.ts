import { db } from "@/db";
import {
  User,
  EmailVerificationCode,
  emailVerificationCodes,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { isWithinExpirationDate } from "oslo";

export default async function verifyEmailVerificationCode(
  userId: User["id"],
  email: User["email"],
  code: EmailVerificationCode["code"]
) {
  return await db.transaction(async (tx) => {
    const [databaseCode] = await tx
      .select()
      .from(emailVerificationCodes)
      .where(
        and(
          eq(emailVerificationCodes.userId, userId),
          eq(emailVerificationCodes.email, email),
          eq(emailVerificationCodes.code, code)
        )
      )
      .limit(1);

    if (!databaseCode) {
      tx.rollback();
      return false;
    }

    await tx
      .delete(emailVerificationCodes)
      .where(eq(emailVerificationCodes.id, databaseCode.id));

    return isWithinExpirationDate(databaseCode.expiresAt);
  });
}
