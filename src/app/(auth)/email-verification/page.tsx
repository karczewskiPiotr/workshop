import validateRequest from "@/api/auth/validate-request";
import EmailVerificationForm from "./_components/email-verification-form";
import { redirect } from "next/navigation";

export default async function EmailVerificationPage() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");
  else if (user.emailVerified) return redirect("/dashboard");

  return (
    <main>
      <h1>Verify email address</h1>
      <EmailVerificationForm />
    </main>
  );
}
