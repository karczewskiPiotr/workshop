"use client";

import requestAccount from "@/api/auth/request-account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export default function SignUpForm() {
  const [state, formAction] = useFormState(requestAccount, { errors: [] });

  return (
    <form className="space-y-2" action={formAction}>
      <Label htmlFor="username">Username</Label>
      <Input name="username" id="username" type="text" className="text-black" />
      <br />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        name="password"
        id="password"
        className="text-black"
      />
      <br />
      {state?.errors.map((error, index) => (
        <p key={`signUpFormError-${index}`} className="text-destructive">
          {error}
        </p>
      ))}
      <br />
      <Button type="submit">Continue</Button>
    </form>
  );
}
