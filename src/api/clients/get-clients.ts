"use server";

import { db } from "@/db";
import { Garage, clients, employees, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getClients(garageId: Garage["id"]) {
    return await db
      .select()
      .from(clients)
      .where(eq(clients.garageId, garageId));
  },
  ["get-clients"],
  { tags: ["clients"] }
);
