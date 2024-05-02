"use server";

import { db } from "@/db";
import { Client, clients, insertClientSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

const requestSchema = insertClientSchema.pick({
  name: true,
  surname: true,
  company: true,
  email: true,
  phone: true,
});

export default async function updateClient(
  id: Client["id"],
  _formState: any,
  formData: FormData
) {
  const client = requestSchema.safeParse({
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
    await db.update(clients).set(client.data).where(eq(clients.id, id));

    revalidateTag("clients");
    revalidateTag("cars");
    return { success: true, errors: [] };
  } catch (error) {
    console.log(error);
    return { success: false, errors: ["Could not update client"] };
  }
}
