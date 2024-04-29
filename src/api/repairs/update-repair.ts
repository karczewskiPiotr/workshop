"use server";

import { db } from "@/db";
import { Repair, insertRepairSchema, repairs } from "@/db/schema";
import { toDate } from "date-fns";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

const requestSchema = insertRepairSchema.pick({
  servicedAt: true,
  description: true,
});

export default async function updateRepair(
  repairId: Repair["id"],
  _prevState: any,
  formData: FormData
) {
  const repair = requestSchema.safeParse({
    description: formData.get("description"),
    servicedAt: toDate(formData.get("servicedAt")!.toString()),
  });

  if (!repair.success) {
    return { errors: repair.error.errors.map((e) => e.message) };
  }

  try {
    await db.update(repairs).set(repair.data).where(eq(repairs.id, repairId));
  } catch (error) {
    console.log(error);
    return { errors: ["Could not update repair"] };
  }

  revalidateTag("repairs");
}
