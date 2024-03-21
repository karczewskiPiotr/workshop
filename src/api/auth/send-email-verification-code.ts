import { User } from "@/db/schema";
import generateEmailVerificationCode from "./generate-email-verification-code";
import { resend } from "@/resend";

export default async function sendEmailVerificationcode(
  userId: User["id"],
  email: User["email"]
) {
  const verificationCode = await generateEmailVerificationCode(userId, email);

  console.log("verificationCode", verificationCode);

  const d = await resend.emails.send({
    from: "workshop@resend.dev",
    to: email,
    subject: "Workshop - Email verification",
    html: `<p>Verify your email with the code: <strong>${verificationCode}</strong>!</p>`,
  });

  console.log("resend", d);
}
