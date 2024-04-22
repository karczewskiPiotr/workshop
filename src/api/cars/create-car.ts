"use server";

import { db } from "@/db";
import { cars, insertCarSchema } from "@/db/schema";
import { revalidateTag } from "next/cache";

const requestSchema = insertCarSchema.pick({
  clientId: true,
  make: true,
  model: true,
  licensePlate: true,
  vinNumber: true,
  fleet: true,
});

export default async function createCar(formData: FormData) {
  const car = requestSchema.safeParse({
    clientId: formData.get("clientId"),
    make: formData.get("make"),
    model: formData.get("model"),
    licensePlate: formData.get("licensePlate"),
    vinNumber: formData.get("vinNumber"),
    fleet: formData.get("fleet") ?? false,
  });

  if (!car.success) {
    return { errors: car.error.errors.map((e) => e.message) };
  }

  try {
    await db.insert(cars).values(car.data);
  } catch (error) {
    console.log(error);
    return { errors: ["Could not create car"] };
  }

  revalidateTag("cars");
}
