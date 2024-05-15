"use server";

import { db } from "@/db";
import { Garage, cars, clients } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getGarageCarsCount(garageId: Garage["id"]) {
    return await db
      .select({ count: count() })
      .from(cars)
      .leftJoin(clients, eq(cars.clientId, clients.id))
      .where(eq(clients.garageId, garageId));
  },
  ["get-garage-cars-count"],
  { tags: ["cars"] }
);
