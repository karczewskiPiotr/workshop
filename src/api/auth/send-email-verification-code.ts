import { User } from "@/db/schema";
import generateEmailVerificationCode from "./generate-email-verification-code";
import { resend } from "@/resend";
import { env } from "@/env";

export default async function sendEmailVerificationcode(
  userId: User["id"],
  email: User["email"]
) {
  const verificationCode = await generateEmailVerificationCode(userId, email);

  const resendResponse = await resend.emails.send({
    from: `Workshop <onboarding@${env.EMAIL_DOMAIN}>`,
    to: email,
    subject: "Workshop - Email verification",
    html: `<p>Verify your email with the code: <strong>${verificationCode}</strong></p>`,
  });

  if (resendResponse.error) {
    throw new Error("Failed to send verification email via Resend", {
      cause: resendResponse,
    });
  }
}
