import validateRequest from "@/api/auth/validate-request";
import SignUpForm from "./_components/sign-up-form";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const { user } = await validateRequest();
  if (user && !user.emailVerified) return redirect("/email-verification");
  else if (user) return redirect("/dashboard");

  return (
    <main className="space-y-4 px-2">
      <h1>Request an account</h1>
      <SignUpForm />
    </main>
  );
}
