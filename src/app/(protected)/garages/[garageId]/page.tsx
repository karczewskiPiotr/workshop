import getGarage from "@/api/garages/get-garage";
import Dashboard, { DashboardBreadcrumb } from "@/components/dashboard";
import getGarageDashboardItems from "@/lib/getGarageDashboardItems";

type Props = { params: { garageId: string } };

export default async function GaragePage({ params }: Props) {
  const [garage] = await getGarage(params.garageId);

  const items = getGarageDashboardItems(params.garageId, "dashboard");
  const breadcrumbs: DashboardBreadcrumb[] = [
    { label: "Dashboard", link: "/dashboard" },
    { label: garage.name },
  ];

  return (
    <Dashboard items={items} breadcrumbs={breadcrumbs}>
      <h1>Garage</h1>
      <p>{garage.name}</p>
    </Dashboard>
  );
}
