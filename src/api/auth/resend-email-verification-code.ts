"use server";

import validateRequest from "./validate-request";
import sendEmailVerificationcode from "./send-email-verification-code";

export default async function resendEmailVerificationCode() {
  const { user } = await validateRequest();
  console.log("user", user);

  if (!user) return { errors: ["Not logged in"] };

  try {
    await sendEmailVerificationcode(user.id, user.email);
  } catch (error: unknown) {
    return { errors: ["Could not send verification code"] };
  }
}
