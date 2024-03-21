import validateRequest from "@/api/auth/validate-request";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

type Props = Readonly<PropsWithChildren>;

export default async function ProtectedLayout(props: Props) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return <>{props.children}</>;
}
