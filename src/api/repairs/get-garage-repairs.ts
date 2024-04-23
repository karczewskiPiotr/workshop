"use server";

import { db } from "@/db";
import { Garage, repairs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getGarageRepairs(garageId: Garage["id"]) {
    return await db
      .select()
      .from(repairs)
      .where(eq(repairs.garageId, garageId));
  },
  ["get-repairs"],
  { tags: ["repairs"] }
);
