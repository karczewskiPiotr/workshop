"use server";

import { db } from "@/db";
import { User, Garage, insertRepairSchema, repairs } from "@/db/schema";
import { toDate } from "date-fns";
import { revalidateTag } from "next/cache";

const requestSchema = insertRepairSchema.pick({
  carId: true,
  userId: true,
  garageId: true,
  servicedAt: true,
  description: true,
});

export default async function createRepair(
  garageId: Garage["id"],
  userId: User["id"],
  _prevState: any,
  formData: FormData
) {
  const repair = requestSchema.safeParse({
    userId,
    garageId,
    carId: formData.get("carId"),
    description: formData.get("description"),
    servicedAt: toDate(formData.get("servicedAt")!.toString()),
  });

  if (!repair.success) {
    return {
      success: false,
      errors: repair.error.errors.map((e) => e.message),
    };
  }

  try {
    await db.insert(repairs).values(repair.data);

    revalidateTag("repairs");
    return { success: true, errors: [] };
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Could not create repair"] };
  }
}
