import getEmployments from "@/api/employees/get-employment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/db/schema";
import Employment from "./employment";

export default async function Employments(props: { userId: User["id"] }) {
  const employments = await getEmployments(props.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {employments.map((employment) => (
            <Employment
              key={employment.id}
              id={employment.id}
              status={employment.status}
              label={employment.garage ?? ""}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
