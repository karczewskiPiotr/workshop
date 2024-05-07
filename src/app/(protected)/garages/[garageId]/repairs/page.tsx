import validateRequest from "@/api/auth/validate-request";
import getGarageCars from "@/api/cars/get-garage-cars";
import getGarage from "@/api/garages/get-garage";
import getGarageRepairs from "@/api/repairs/get-garage-repairs";
import Dashboard, { DashboardBreadcrumb } from "@/components/dashboard";
import getGarageDashboardItems from "@/lib/getGarageDashboardItems";
import { redirect } from "next/navigation";
import RepairsTable from "./_components/repairs-table";
import CreateRepairDialog from "./_components/create-repair-dialog";

type Props = { params: { garageId: string } };

export default async function RepairsPage({ params }: Props) {
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
      <RepairsTable
        repairs={repairs.map((r) => ({ ...r, subRows: r.repair.description }))}
        addButton={
          <CreateRepairDialog
            cars={cars}
            userId={user.id}
            garageId={params.garageId}
          />
        }
      />
    </Dashboard>
  );
}
