import { DashboardNavItem } from "@/components/dashboard";
import { Garage } from "@/db/schema";
import { Home, Wrench, Car, Users, HardHat } from "lucide-react";

export default function getGarageDashboardItems(
  garageId: Garage["id"],
  active: "dashboard" | "repairs" | "cars" | "clients" | "employees"
) {
  return [
    {
      label: "Dashboard",
      link: `/garages/${garageId}`,
      icon: Home,
      active: active === "dashboard",
    },
    {
      label: "Repairs",
      link: `/garages/${garageId}/repairs`,
      icon: Wrench,
      active: active === "repairs",
    },
    {
      label: "Cars",
      link: `/garages/${garageId}/cars`,
      icon: Car,
      active: active === "cars",
    },
    {
      label: "Clients",
      link: `/garages/${garageId}/clients`,
      icon: Users,
      active: active === "clients",
    },
    {
      label: "Employees",
      link: `/garages/${garageId}/employees`,
      icon: HardHat,
      active: active === "employees",
    },
  ] satisfies DashboardNavItem[];
}
