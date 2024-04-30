import getEmployees from "@/api/employees/get-employees";
import getPotentialEmployees from "@/api/employees/get-potential-employess";
import getGarage from "@/api/garages/get-garage";
import Dashboard, { DashboardBreadcrumb } from "@/components/dashboard";
import getGarageDashboardItems from "@/lib/getGarageDashboardItems";
import EmployeeTable from "./_components/employee-table";
import AddEmployeeDialog from "./_components/add-employee-dialog";

export default async function EmployeesPage({
  params,
}: {
  params: { garageId: string };
}) {
  const [garage] = await getGarage(params.garageId);
  const employees = await getEmployees(params.garageId);
  const potentialEmployees = await getPotentialEmployees(params.garageId);

  const items = getGarageDashboardItems(params.garageId, "employees");
  const breadcrumbs: DashboardBreadcrumb[] = [
    { label: "Dashboard", link: "/dashboard" },
    { label: garage.name, link: `/garages/${params.garageId}` },
    { label: "Employees" },
  ];

  return (
    <Dashboard items={items} breadcrumbs={breadcrumbs}>
      <EmployeeTable
        employees={employees}
        owner={garage.owner}
        addButton={
          <AddEmployeeDialog
            garageId={params.garageId}
            potentialEmployees={potentialEmployees}
            buttonProps={{ size: "sm", className: "ml-auto gap-1" }}
          />
        }
      />
    </Dashboard>
  );
}
