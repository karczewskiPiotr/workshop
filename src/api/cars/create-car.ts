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

export default async function createCar(_formState: any, formData: FormData) {
  const car = requestSchema.safeParse({
    clientId: formData.get("clientId"),
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
    await db.insert(cars).values(car.data);

    revalidateTag("cars");
    return { success: true, errors: [] };
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Could not create car"] };
  }
}
