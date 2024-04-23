import validateRequest from "@/api/auth/validate-request";
import SignInForm from "./_components/login-form";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SignInPage() {
  const { user } = await validateRequest();
  if (user && !user.emailVerified) return redirect("/email-verification");
  else if (user) return redirect("/dashboard");

  return (
    <main className="flex justify-center items-center flex-auto">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Log in</CardTitle>
          <CardDescription>
            Enter your email below to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </main>
  );
}
