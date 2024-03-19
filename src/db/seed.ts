import { generateId } from "lucia";
import { db } from ".";
import { users } from "./schema";
import { Argon2id } from "oslo/password";
import { env } from "../env";

(async function () {
  if (!env.ADMIN_PASSWORD) throw new Error("ADMIN_PASSWORD is not set");

  await db.insert(users).values({
    id: generateId(15),
    username: "admin",
    password: await new Argon2id().hash(env.ADMIN_PASSWORD),
    role: "admin",
  });
})().then(() => console.log("Seeded database"));
