"use server";

import { db } from "@/db";
import { User, garages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getGarages(userId: User["id"]) {
    return await db
      .select({ id: garages.id, name: garages.name })
      .from(garages)
      .where(eq(garages.owner, userId));
  },
  ["all-garages"],
  { tags: ["garages"] }
);
