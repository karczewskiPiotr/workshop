import validateRequest from "@/api/validateRequest";
import SignUpForm from "./_components/SignUpForm";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const { user } = await validateRequest();
  if (user) return redirect(user.role === "admin" ? "/users" : "/");

  return (
    <main className="space-y-4">
      <h1>Request an account</h1>
      <SignUpForm />
    </main>
  );
}
