"use server";

import { db } from "@/db";
import { User, employees, garages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getAllGarages(userId: User["id"]) {
    return await db
      .select({ id: garages.id, name: garages.name })
      .from(garages)
      .leftJoin(employees, eq(garages.id, employees.garageId))
      .where(eq(employees.userId, userId));
  },
  ["all-garages"],
  { tags: ["garages"] }
);
