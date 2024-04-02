import { db } from "@/db";
import { User, employees, garages } from "@/db/schema";
import { eq, and, not } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getEmployment(userId: User["id"]) {
    return await db
      .select({
        id: employees.id,
        status: employees.status,
        garage: garages.name,
      })
      .from(employees)
      .leftJoin(garages, eq(employees.garageId, garages.id))
      .where(and(eq(employees.userId, userId), not(eq(garages.owner, userId))));
  },
  ["get-user-invites"],
  { tags: ["employees"] }
);
