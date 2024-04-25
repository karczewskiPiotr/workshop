import getClients from "@/api/clients/get-clients";
import getGarage from "@/api/garages/get-garage";
import Dashboard, { DashboardBreadcrumb } from "@/components/dashboard";
import getGarageDashboardItems from "@/lib/getGarageDashboardItems";
import ClientsList from "./_components/clients-list";
import NewClientDialog from "./_components/new-client-dialog";

export default async function ClientsPage({
  params,
}: {
  params: { garageId: string };
}) {
  const [garage] = await getGarage(params.garageId);
  const clients = await getClients(params.garageId);

  const items = getGarageDashboardItems(params.garageId, "clients");
  const breadcrumbs: DashboardBreadcrumb[] = [
    { label: "Dashboard", link: "/dashboard" },
    { label: garage.name, link: `/garages/${params.garageId}` },
    { label: "Clients" },
  ];

  return (
    <Dashboard items={items} breadcrumbs={breadcrumbs}>
      <ClientsList
        clients={clients}
        addButton={<NewClientDialog garageId={params.garageId} />}
      />
    </Dashboard>
  );
}
