"use server";

import { db } from "@/db";
import { Repair, repairs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export default async function deleteRepair(repairId: Repair["id"]) {
  try {
    await db.delete(repairs).where(eq(repairs.id, repairId));
  } catch (error) {
    return { errors: ["Could not delete repair"] };
  }

  revalidateTag("repairs");
}
