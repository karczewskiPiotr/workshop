import { db } from "@/db";
import { Garage, User, garages } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getGarage(garageId: Garage["id"]) {
  return await db
    .select()
    .from(garages)
    .where(eq(garages.id, garageId))
    .limit(1);
}
