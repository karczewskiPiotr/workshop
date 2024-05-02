import validateRequest from "@/api/auth/validate-request";
import EmailVerificationForm from "./_components/email-verification-form";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function EmailVerificationPage() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");
  else if (user.emailVerified) return redirect("/dashboard");

  return (
    <main className="flex justify-center items-center flex-auto">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Verify email</CardTitle>
          <CardDescription>
            Enter verification code to confirm your email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmailVerificationForm />
        </CardContent>
      </Card>
    </main>
  );
}
