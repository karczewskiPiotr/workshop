"use client";

import resendEmailVerificationCode from "@/api/auth/resend-email-verification-code";
import verifyEmail from "@/api/auth/verify-email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export default function EmailVerificationForm() {
  const [state, formAction] = useFormState(verifyEmail, { errors: [] });

  return (
    <form action={formAction}>
      <Label htmlFor="code">Code</Label>
      <Input name="code" id="code" type="text" />
      <br />
      {state?.errors.map((error, index) => (
        <p key={`loginFormError-${index}`} className="text-destructive">
          {error}
        </p>
      ))}
      <br />
      <Button type="submit">Verify email</Button>
      <Button
        type="button"
        variant="ghost"
        onClick={() => resendEmailVerificationCode()}
      >
        Resend code
      </Button>
    </form>
  );
}
