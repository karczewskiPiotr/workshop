"use client";

import requestAccount from "@/api/auth/signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export default function SignUpForm() {
  const [state, formAction] = useFormState(requestAccount, { errors: [] });

  return (
    <form className="space-y-2" action={formAction}>
      <Label htmlFor="email">Email</Label>
      <Input name="email" id="email" type="email" />
      <br />
      <Label htmlFor="name">Name</Label>
      <Input name="name" id="name" type="text" />
      <br />
      <Label htmlFor="surname">Surname</Label>
      <Input name="surname" id="surname" type="text" />
      <br />
      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" id="password" />
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
