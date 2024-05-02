import getGarages from "@/api/garages/get-garages";
import { buttonVariants } from "@/components/ui/button";
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

export default async function Garages(props: { userId: User["id"] }) {
  const garages = await getGarages(props.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Garages</CardTitle>
        <CardDescription>Manage your garages</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {garages.map((garage) => (
            <li key={garage.id}>
              <a
                href={`/garages/${garage.id}`}
                className={buttonVariants({ variant: "link" })}
              >
                {garage.name}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <CreateGarageDialog userId={props.userId} />
      </CardFooter>
    </Card>
  );
}
