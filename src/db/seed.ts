import { generateId } from "lucia";
import { db } from ".";
import { users } from "./schema";
import { Argon2id } from "oslo/password";

(async function () {
  await db.insert(users).values([
    {
      id: generateId(15),
      name: "Jan",
      surname: "Kowalski",
      email: "test1@example.com",
      emailVerified: true,
      password: await new Argon2id().hash("test"),
    },
    {
      id: generateId(15),
      name: "John",
      surname: "Smith",
      email: "test2@example.com",
      emailVerified: true,
      password: await new Argon2id().hash("test"),
    },
  ]);
})().then(() => console.log("Seeded database"));
