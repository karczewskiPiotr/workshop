"use server";

import { db } from "@/db";
import { Garage, clients } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getGarageClientsCount(garageId: Garage["id"]) {
    return await db
      .select({ count: count() })
      .from(clients)
      .where(eq(clients.garageId, garageId));
  },
  ["get-clients-count"],
  { tags: ["clients"] }
);
