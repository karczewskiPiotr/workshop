import getGarage from "@/api/garages/get-garage";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PropsWithChildren } from "react";

type Props = Readonly<PropsWithChildren<{ params: { garageId: string } }>>;

export default async function ProtectedLayout(props: Props) {
  const [garage] = await getGarage(props.params.garageId);

  return <>{props.children}</>;

  // return (
  //   <div className="flex flex-auto">
  //     <aside className="w-fit p-2 border-r">
  //       <nav>
  //         <p className="uppercase font-bold">{garage.name}</p>
  //         <ul>
  //           <li>
  //             <Link
  //               className={buttonVariants({ variant: "link" })}
  //               href={`/garages/${garage.id}/repairs`}
  //             >
  //               Repairs
  //             </Link>
  //           </li>
  //           <li>
  //             <Link
  //               className={buttonVariants({ variant: "link" })}
  //               href={`/garages/${garage.id}/cars`}
  //             >
  //               Cars
  //             </Link>
  //           </li>
  //           <li>
  //             <Link
  //               className={buttonVariants({ variant: "link" })}
  //               href={`/garages/${garage.id}/clients`}
  //             >
  //               Clients
  //             </Link>
  //           </li>
  //           <li>
  //             <Link
  //               className={buttonVariants({ variant: "link" })}
  //               href={`/garages/${garage.id}/employees`}
  //             >
  //               Employees
  //             </Link>
  //           </li>
  //         </ul>
  //       </nav>
  //     </aside>
  //     <main>{props.children}</main>
  //   </div>
  // );
}
