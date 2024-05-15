import { db } from "@/db";
import { Garage, employees } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getGarageEmployeesCount(garageId: Garage["id"]) {
    return await db
      .select({ count: count() })
      .from(employees)
      .where(eq(employees.garageId, garageId));
  },
  ["get-garage-employees-count"],
  { tags: ["employees"] }
);
