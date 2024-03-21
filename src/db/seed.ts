import { generateId } from "lucia";
import { db } from ".";
import { users } from "./schema";
import { Argon2id } from "oslo/password";
import { env } from "../env";

(async function () {
  await db.insert(users).values({
    id: generateId(15),
    name: "John",
    surname: "Kowalski",
    email: "test@example.com",
    emailVerified: true,
    password: await new Argon2id().hash("test"),
  });
})().then(() => console.log("Seeded database"));
