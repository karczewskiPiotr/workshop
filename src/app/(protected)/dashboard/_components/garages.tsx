import getGarages from "@/api/garages/get-garages";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { User } from "@/db/schema";
import CreateGarageDialog from "./create-garage-dialog";
import GaragesTable from "./garages-table";

export default async function Garages(props: { userId: User["id"] }) {
  const garages = await getGarages(props.userId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="grid gap-2">
          <CardTitle>Garages</CardTitle>
          <CardDescription>Manage your garages</CardDescription>
        </div>
        <CreateGarageDialog userId={props.userId} />
      </CardHeader>
      <CardContent>
        <GaragesTable garages={garages} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
