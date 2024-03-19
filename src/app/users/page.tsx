import { signups, users } from "@/db/schema";
import { db } from "@/db";
import Request from "./_components/Request";
import { eq } from "drizzle-orm";
import validateRequest from "@/api/auth/validateRequest";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const { user } = await validateRequest();
  if (!user || user.role !== "admin") return redirect("/login");

  const requests = await db
    .select({
      id: signups.id,
      status: signups.status,
      username: users.username,
    })
    .from(signups)
    .leftJoin(users, eq(signups.userId, users.id))
    .orderBy(signups.status, users.username);

  return (
    <main className="space-y-4">
      <h1>Users</h1>
      <ul>
        {requests.map(({ id, username, status }) => (
          <Request key={id} id={id} username={username!} status={status} />
        ))}
      </ul>
      <pre>{JSON.stringify(requests, null, 4)}</pre>
    </main>
  );
}
