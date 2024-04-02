"use client";

import deleteEmployee from "@/api/employees/delete-employee";
import updateEmployee from "@/api/employees/update-employee";
import { Button } from "@/components/ui/button";
import { Employee } from "@/db/schema";

type Props = {
  label: string;
  id: Employee["id"];
  status: Employee["status"];
};

export default function Employment(props: Props) {
  return (
    <li key={props.id} className="space-x-4">
      <span>
        {props.label} - {props.status}
      </span>
      <Button onClick={() => updateEmployee(props.id, "active")}>Accept</Button>
      <Button variant="destructive" onClick={() => deleteEmployee(props.id)}>
        Reject
      </Button>
    </li>
  );
}
