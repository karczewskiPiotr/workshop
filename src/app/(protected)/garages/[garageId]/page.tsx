import getGarage from "@/api/garages/get-garage";
import Dashboard, { DashboardBreadcrumb } from "@/components/dashboard";
import getGarageDashboardItems from "@/lib/getGarageDashboardItems";
import { Suspense } from "react";
import {
  CardSkeleton,
  CarsCard,
  ClientsCard,
  EmployeesCard,
  RepairsCard,
} from "../../dashboard/_components/dashboard-cards";
import Link from "next/link";

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
      <div className="grid grid-cols-4 gap-4">
        <Link href={`/garages/${params.garageId}/repairs`}>
          <Suspense fallback={<CardSkeleton />}>
            <RepairsCard garageId={params.garageId} />
          </Suspense>
        </Link>
        <Link href={`/garages/${params.garageId}/cars`}>
          <Suspense fallback={<CardSkeleton />}>
            <CarsCard garageId={params.garageId} />
          </Suspense>
        </Link>
        <Link href={`/garages/${params.garageId}/clients`}>
          <Suspense fallback={<CardSkeleton />}>
            <ClientsCard garageId={params.garageId} />
          </Suspense>
        </Link>
        <Link href={`/garages/${params.garageId}/employees`}>
          <Suspense fallback={<CardSkeleton />}>
            <EmployeesCard garageId={params.garageId} />
          </Suspense>
        </Link>
      </div>
    </Dashboard>
  );
}
