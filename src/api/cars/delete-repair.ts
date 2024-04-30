"use server";

import { db } from "@/db";
import { Car, cars } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export default async function deleteCar(carId: Car["id"]) {
  try {
    await db.delete(cars).where(eq(cars.id, carId));
  } catch (error) {
    return { errors: ["Could not delete car"] };
  }

  revalidateTag("cars");
}
