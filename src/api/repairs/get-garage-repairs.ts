"use server";

import { db } from "@/db";
import { Garage, cars, clients, repairs, users } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getGarageRepairs(garageId: Garage["id"]) {
    return await db
      .select()
      .from(repairs)
      .innerJoin(cars, eq(repairs.carId, cars.id))
      .innerJoin(clients, eq(cars.clientId, clients.id))
      .innerJoin(users, eq(repairs.userId, users.id))
      .where(and(eq(repairs.garageId, garageId)));
  },
  ["get-repairs"],
  { tags: ["repairs"] }
);
