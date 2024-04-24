"use server";

import { lucia } from "@/auth";
import validateRequest from "./validate-request";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
  console.log("HELLO");

  const { session } = await validateRequest();
  if (!session) return { errors: ["Not logged in"] };

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/login");
}
