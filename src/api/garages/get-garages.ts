"use server";

import { db } from "@/db";
import { User, employees, garages } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getGarages(userId: User["id"]) {
    return await db
      .selectDistinct({ id: garages.id, name: garages.name })
      .from(garages)
      .leftJoin(employees, eq(garages.id, employees.garageId))
      .where(or(eq(garages.owner, userId), eq(employees.userId, userId)));
  },
  ["all-garages"],
  { tags: ["garages"] }
);
