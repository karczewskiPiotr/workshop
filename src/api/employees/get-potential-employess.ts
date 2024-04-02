"use server";

import { db } from "@/db";
import { Garage, employees, garages, users } from "@/db/schema";
import { eq, not, or, notExists } from "drizzle-orm";

export default async function getPotentialEmployees(garageId: Garage["id"]) {
  return await db
    .select({
      id: users.id,
      name: users.name,
      surname: users.surname,
      email: users.email,
    })
    .from(users)
    .leftJoin(employees, eq(employees.userId, users.id))
    .where(
      or(
        notExists(
          db.select().from(employees).where(eq(employees.userId, users.id))
        ),
        not(eq(employees.garageId, garageId))
      )
    );
}
