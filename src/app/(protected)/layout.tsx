import validateRequest from "@/api/auth/validate-request";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Hexagon, Home, PanelLeft, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserDropdown from "./dashboard/_components/test2";
import Dashboard from "@/components/dashboard";

type Props = Readonly<PropsWithChildren<{ navigation: React.ReactNode }>>;

export default async function ProtectedLayout(props: Props) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");

  return <>{props.children}</>;
}
