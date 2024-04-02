"use server";

import { db } from "@/db";
import { Employee, employees } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export default async function updateEmployee(
  id: Employee["id"],
  status: Employee["status"]
) {
  try {
    await db.update(employees).set({ status }).where(eq(employees.id, id));
  } catch (error) {
    return { errors: ["Could not update employee"] };
  }

  revalidateTag("employees");
}
