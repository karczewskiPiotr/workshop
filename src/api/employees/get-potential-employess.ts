"use server";

import { db } from "@/db";
import { Garage, employees, users } from "@/db/schema";
import { eq, isNull } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getPotentialEmployees(garageId: Garage["id"]) {
    const sq = db
      .select({ userId: employees.userId, garageId: employees.garageId })
      .from(employees)
      .where(eq(employees.garageId, garageId))
      .as("sq");

    return await db
      .select({
        id: users.id,
        name: users.name,
        surname: users.surname,
        email: users.email,
      })
      .from(users)
      .leftJoin(sq, eq(users.id, sq.userId))
      .where(isNull(sq.garageId));
  },
  ["get-potential-employees"],
  { tags: ["employees"] }
);
