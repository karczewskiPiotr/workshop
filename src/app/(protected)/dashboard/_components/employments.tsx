import getEmployments from "@/api/employees/get-employment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/db/schema";
import EmploymentsTable from "./employments-table";

export default async function Employments(props: { userId: User["id"] }) {
  const employments = await getEmployments(props.userId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employments</CardTitle>
        <CardDescription>New employments will show up here.</CardDescription>
      </CardHeader>
      <CardContent>
        <EmploymentsTable employments={employments} />
      </CardContent>
    </Card>
  );
}
