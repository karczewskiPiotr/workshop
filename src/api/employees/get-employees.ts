import { db } from "@/db";
import { Garage, employees, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getEmployees(garageId: Garage["id"]) {
    return await db
      .select({
        id: employees.id,
        name: users.name,
        surname: users.surname,
        email: users.email,
        status: employees.status,
      })
      .from(employees)
      .leftJoin(users, eq(employees.userId, users.id))
      .where(eq(employees.garageId, garageId));
  },
  ["get-employees"],
  { tags: ["employees"] }
);
