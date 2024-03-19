import validateRequest from "@/api/auth/validateRequest";
import SignInForm from "./_components/login-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { user } = await validateRequest();
  if (user) return redirect(user.role === "admin" ? "/users" : "/");

  return (
    <main className="space-y-4 px-2">
      <h1>Sign In</h1>
      <SignInForm />
    </main>
  );
}
