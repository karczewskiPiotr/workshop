"use server";

import { db } from "@/db";
import { Employee, employees } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export default async function deleteEmployee(id: Employee["id"]) {
  try {
    await db.delete(employees).where(eq(employees.id, id));
  } catch (error) {
    return { errors: ["Could not delete employee"] };
  }

  revalidateTag("employees");
}
