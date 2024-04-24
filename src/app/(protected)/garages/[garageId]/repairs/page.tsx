import validateRequest from "@/api/auth/validate-request";
import getGarageCars from "@/api/cars/get-garage-cars";
import getGarage from "@/api/garages/get-garage";
import getGarageRepairs from "@/api/repairs/get-garage-repairs";
import Dashboard, { DashboardBreadcrumb } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import getGarageDashboardItems from "@/lib/getGarageDashboardItems";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import RepairForm from "./_components/repair-form";

export default async function RepairsPage({
  params,
}: {
  params: { garageId: string };
}) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  const [garage] = await getGarage(params.garageId);
  const repairs = await getGarageRepairs(params.garageId);
  const cars = await getGarageCars(params.garageId);

  const items = getGarageDashboardItems(params.garageId, "repairs");
  const breadcrumbs: DashboardBreadcrumb[] = [
    { label: "Dashboard", link: "/dashboard" },
    { label: garage.name, link: `/garages/${params.garageId}` },
    { label: "Repairs" },
  ];

  return (
    <Dashboard items={items} breadcrumbs={breadcrumbs}>
      <h1>Repairs</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Log repair</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a repair</DialogTitle>
            <DialogDescription>
              This action will add a repair.
            </DialogDescription>
          </DialogHeader>
          <RepairForm cars={cars} garageId={params.garageId} userId={user.id} />
        </DialogContent>
      </Dialog>
      <ul>
        {repairs.map((repair) => (
          <li key={repair.id}>
            <p>date: {JSON.stringify(repair.servicedAt)}</p>
            <p>date: {format(repair.servicedAt, "Pp O")}</p>
            <pre>{JSON.stringify(repair, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </Dashboard>
  );
}
