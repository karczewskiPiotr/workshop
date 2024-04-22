"use server";

import { db } from "@/db";
import { Garage, cars, clients, employees, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export default unstable_cache(
  async function getGarageCars(garageId: Garage["id"]) {
    return await db
      .select({
        id: cars.id,
        make: cars.make,
        model: cars.model,
        licensePlate: cars.licensePlate,
        vinNumber: cars.vinNumber,
        fleet: cars.fleet,
        clientId: clients.id,
        clientName: clients.name,
        clientSurname: clients.surname,
        clientCompany: clients.company,
      })
      .from(cars)
      .leftJoin(clients, eq(cars.clientId, clients.id))
      .where(eq(clients.garageId, garageId));
  },
  ["get-garage-cars"],
  { tags: ["cars"] }
);
