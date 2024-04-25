import getGarageCars from "@/api/cars/get-garage-cars";
import getClients from "@/api/clients/get-clients";
import getGarage from "@/api/garages/get-garage";
import Dashboard, { DashboardBreadcrumb } from "@/components/dashboard";
import getGarageDashboardItems from "@/lib/getGarageDashboardItems";
import CarsTable from "./_components/cars-table";
import NewCarDialog from "./_components/new-car-dialog";

type Props = { params: { garageId: string } };

export default async function CarsPage({ params }: Props) {
  const [garage] = await getGarage(params.garageId);
  const cars = await getGarageCars(params.garageId);
  const clients = await getClients(params.garageId);

  const items = getGarageDashboardItems(params.garageId, "cars");
  const breadcrumbs: DashboardBreadcrumb[] = [
    { label: "Dashboard", link: "/dashboard" },
    { label: garage.name, link: `/garages/${params.garageId}` },
    { label: "Cars" },
  ];

  return (
    <Dashboard items={items} breadcrumbs={breadcrumbs}>
      <CarsTable cars={cars} addButton={<NewCarDialog clients={clients} />} />
    </Dashboard>
  );
}
