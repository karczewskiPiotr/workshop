import validateRequest from "@/api/auth/validate-request";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
}
