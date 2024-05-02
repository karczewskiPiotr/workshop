"use server";

import { db } from "@/db";
import { Car, cars, insertCarSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

const requestSchema = insertCarSchema.pick({
  make: true,
  model: true,
  licensePlate: true,
  vinNumber: true,
  fleet: true,
});

export default async function updateCar(
  carId: Car["id"],
  _formState: any,
  formData: FormData
) {
  const car = requestSchema.safeParse({
    make: formData.get("make"),
    model: formData.get("model"),
    licensePlate: formData.get("licensePlate"),
    vinNumber: formData.get("vinNumber"),
    fleet: !!formData.get("fleet"),
  });

  if (!car.success) {
    return { success: false, errors: car.error.errors.map((e) => e.message) };
  }

  try {
    await db.update(cars).set(car.data).where(eq(cars.id, carId));

    revalidateTag("cars");
    revalidateTag("repairs");
    return { success: true, errors: [] };
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Could not create car"] };
  }
}
