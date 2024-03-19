"use client";

import approve from "@/api/auth/approveAccountRequest";
import { Signup, User, insertSignupSchema } from "@/db/schema";

type Props = {
  id: Signup["id"];
  username: User["username"];
  status: Signup["status"];
};

export default function Request({ id, username, status }: Props) {
  return (
    <li>
      {username}: {status} <button onClick={() => approve(id)}>Approve</button>
    </li>
  );
}
