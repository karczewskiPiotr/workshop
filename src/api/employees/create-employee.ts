"use server";

import { db } from "@/db";
import { Garage, employees, insertEmployeeSchema } from "@/db/schema";
import { revalidateTag } from "next/cache";

const requestSchema = insertEmployeeSchema.pick({
  userId: true,
  garageId: true,
});

export default async function createEmployee(
  garageId: Garage["id"],
  formData: FormData
) {
  const employee = requestSchema.safeParse({
    userId: formData.get("userId"),
    garageId,
  });

  if (!employee.success) {
    return { errors: employee.error.errors.map((e) => e.message) };
  }

  try {
    await db.insert(employees).values({
      userId: employee.data.userId,
      garageId: employee.data.garageId,
    });
  } catch (error) {
    return { errors: ["Could not create employee"] };
  }

  revalidateTag("employees");
}
