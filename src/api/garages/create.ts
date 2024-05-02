"use server";

import { db } from "@/db";
import { User, employees, garages, insertGarageSchema } from "@/db/schema";
import { revalidateTag } from "next/cache";

const requestSchema = insertGarageSchema.pick({ name: true });

export default async function createGarage(
  userId: User["id"],
  _formState: any,
  formData: FormData
) {
  const garage = requestSchema.safeParse({
    name: formData.get("name"),
  });
  if (!garage.success)
    return {
      success: false,
      errors: garage.error.errors.map((e) => e.message),
    };

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

    revalidateTag("garages");
    return { success: true, errors: [] };
  } catch (error: unknown) {
    console.error(error);
    return { success: false, errors: ["Could not create garage"] };
  }
}
