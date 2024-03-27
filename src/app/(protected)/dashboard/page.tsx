import validateRequest from "@/api/auth/validate-request";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import Garages from "./_components/garages";
import { Suspense } from "react";

export default async function DashboardPage() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return (
    <main className="px-2 flex flex-col">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight mb-4">
        Dashboard
      </h1>
      <div className="flex gap-3 flex-auto w-full">
        <div className="flex-1 flex flex-col gap-3">
          <Suspense fallback={<p>Loading...</p>}>
            <Garages userId={user.id} />
          </Suspense>
          <Card>
            <CardHeader>
              <CardTitle>Invites</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        </div>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
