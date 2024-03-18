"use client";

import requestAccount from "@/api/requestAccount";
import { useFormState } from "react-dom";

export default function SignUpForm() {
  const [state, formAction] = useFormState(requestAccount, { errors: [] });

  return (
    <form className="space-y-2" action={formAction}>
      <label htmlFor="username">Username</label>
      <input name="username" id="username" type="text" className="text-black" />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        className="text-black"
      />
      <br />
      <button type="submit">Continue</button>
      {state?.errors.map((error, index) => (
        <p key={`signUpFormError-${index}`} className="text-red-500">
          {error}
        </p>
      ))}
    </form>
  );
}
