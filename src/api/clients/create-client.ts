"use server";

import { db } from "@/db";
import { Garage, clients, insertClientSchema } from "@/db/schema";
import { revalidateTag } from "next/cache";

const requestSchema = insertClientSchema.pick({
  garageId: true,
  name: true,
  surname: true,
  company: true,
  email: true,
  phone: true,
});

export default async function createClient(
  garageId: Garage["id"],
  _formState: any,
  formData: FormData
) {
  const client = requestSchema.safeParse({
    garageId,
    name: formData.get("name"),
    surname: formData.get("surname"),
    company: formData.get("company") || undefined,
    email: formData.get("email") || undefined,
    phone: formData.get("phone") || undefined,
  });

  if (!client.success) {
    return {
      success: false,
      errors: client.error.errors.map((e) => e.message),
    };
  }

  try {
    await db.insert(clients).values(client.data);

    revalidateTag("clients");
    return { success: true, errors: [] };
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Could not create client"] };
  }
}
