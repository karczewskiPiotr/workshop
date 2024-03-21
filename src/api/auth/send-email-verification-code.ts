import { User } from "@/db/schema";
import generateEmailVerificationCode from "./generate-email-verification-code";
import { resend } from "@/resend";

export default async function sendEmailVerificationcode(
  userId: User["id"],
  email: User["email"]
) {
  const verificationCode = await generateEmailVerificationCode(userId, email);

  const resendResponse = await resend.emails.send({
    from: "workshop@resend.dev",
    to: email,
    subject: "Workshop - Email verification",
    html: `<p>Verify your email with the code: <strong>${verificationCode}</strong>!</p>`,
  });

  if (resendResponse.error) {
    throw new Error("Failed to send verification email via Resend", {
      cause: resendResponse,
    });
  }
}
