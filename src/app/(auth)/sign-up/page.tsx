import validateRequest from "@/api/auth/validate-request";
import SignUpForm from "./_components/sign-up-form";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SignUpPage() {
  const { user } = await validateRequest();
  if (user && !user.emailVerified) return redirect("/email-verification");
  else if (user) return redirect("/dashboard");

  return (
    <main className="flex justify-center items-center flex-auto">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </main>
  );
}
