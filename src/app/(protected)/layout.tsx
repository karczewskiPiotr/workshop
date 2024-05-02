import validateRequest from "@/api/auth/validate-request";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

type Props = Readonly<PropsWithChildren<{ navigation: React.ReactNode }>>;

export default async function ProtectedLayout(props: Props) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return <>{props.children}</>;
}
