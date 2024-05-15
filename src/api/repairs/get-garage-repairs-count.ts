"use server";

import { db } from "@/db";
import { Garage, repairs } from "@/db/schema";
import { and, count, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getGarageRepairsCount(garageId: Garage["id"]) {
    return await db
      .select({ count: count() })
      .from(repairs)
      .where(and(eq(repairs.garageId, garageId)));
  },
  ["get-repairs-count"],
  { tags: ["repairs"] }
);
