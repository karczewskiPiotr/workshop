import validateRequest from "@/api/auth/validate-request";
import { redirect } from "next/navigation";
import Garages from "./_components/garages";
import { Suspense } from "react";
import Employments from "./_components/employments";
import Dashboard, {
  DashboardBreadcrumb,
  DashboardNavItem,
} from "@/components/dashboard";
import { Home } from "lucide-react";

export default async function DashboardPage() {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const items: DashboardNavItem[] = [
    { label: "Dashboard", link: `/dashboard`, icon: Home },
  ];
  const breadcrumbs: DashboardBreadcrumb[] = [{ label: "Dashboard" }];

  return (
    <Dashboard items={items} breadcrumbs={breadcrumbs}>
      <Suspense fallback={<p>Loading...</p>}>
        <Garages userId={user.id} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <Employments userId={user.id} />
      </Suspense>
    </Dashboard>
  );
}
