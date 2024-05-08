"use server";

import { db } from "@/db";
import { User, employees, garages, users } from "@/db/schema";
import { eq, or, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getGarages(userId: User["id"]) {
    const owners = alias(users, "owner");
    return await db
      .selectDistinctOn([garages.id, garages.name], {
        id: garages.id,
        name: garages.name,
        owner:
          sql<string>`CONCAT(CONCAT(${owners.name}, ' '),${owners.surname})`.as(
            "owner"
          ),
      })
      .from(garages)
      .leftJoin(employees, eq(garages.id, employees.garageId))
      .leftJoin(owners, eq(garages.owner, owners.id))
      .where(or(eq(garages.owner, userId), eq(employees.userId, userId)));
  },
  ["all-garages"],
  { tags: ["garages"] }
);
