"use client";

import login from "@/api/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export default function SignUpForm() {
  const [state, formAction] = useFormState(login, { errors: [] });

  return (
    <form className="space-y-2" action={formAction}>
      <Label htmlFor="email">Email</Label>
      <Input name="email" id="email" type="text" />
      <br />
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" id="password" />
      <br />
      {state?.errors.map((error, index) => (
        <p key={`loginFormError-${index}`} className="text-destructive">
          {error}
        </p>
      ))}
      <br />
      <Button type="submit">Continue</Button>
    </form>
  );
}
