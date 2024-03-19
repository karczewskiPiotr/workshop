"use client";

import updateAccountRequest from "@/api/auth/update-account-request";
import { Button } from "@/components/ui/button";
import { Signup, User } from "@/db/schema";

type Props = {
  id: Signup["id"];
  username: User["username"];
  status: Signup["status"];
};

export default function Request({ id, username, status }: Props) {
  return (
    <tr>
      <td>{username}</td>
      <td>{status}</td>
      <td>
        <Button
          onClick={() => updateAccountRequest(id, "approved")}
          disabled={status === "approved"}
        >
          Approve
        </Button>
      </td>
      <td>
        <Button
          variant="destructive"
          onClick={() => updateAccountRequest(id, "rejected")}
          disabled={status === "rejected"}
        >
          Reject
        </Button>
      </td>
    </tr>
  );
}
