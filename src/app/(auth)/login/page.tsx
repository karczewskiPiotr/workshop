import validateRequest from "@/api/auth/validate-request";
import SignInForm from "./_components/login-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { user } = await validateRequest();
  if (user && !user.emailVerified) return redirect("/email-verification");
  else if (user) return redirect("/dashboard");

  return (
    <main className="space-y-4 px-2">
      <h1>Log In</h1>
      <SignInForm />
    </main>
  );
}
