"use server";

import { db } from "@/db";
import { Client, clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export default async function deleteClient(clientId: Client["id"]) {
  try {
    await db.delete(clients).where(eq(clients.id, clientId));
  } catch (error) {
    console.log(error);
    return { errors: ["Could not delete client"] };
  }

  revalidateTag("clients");
}
