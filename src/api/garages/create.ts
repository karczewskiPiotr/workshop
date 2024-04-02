"use server";

import { db } from "@/db";
import { User, employees, garages, insertGarageSchema } from "@/db/schema";
import { revalidateTag } from "next/cache";

const requestSchema = insertGarageSchema.pick({ name: true });

export default async function createGarage(
  userId: User["id"],
  formData: FormData
) {
  const garage = requestSchema.safeParse({
    name: formData.get("name"),
  });
  if (!garage.success)
    return { errors: garage.error.errors.map((e) => e.message) };

  try {
    await db.transaction(async (tx) => {
      const [{ id }] = await tx
        .insert(garages)
        .values({ name: garage.data.name, owner: userId })
        .returning();

      await tx
        .insert(employees)
        .values({ userId, garageId: id, status: "active" });
    });
  } catch (error: unknown) {
    console.error(error);
  }

  revalidateTag("garages");
}
