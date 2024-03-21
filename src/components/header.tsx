import logout from "@/api/auth/logout";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import validateRequest from "@/api/auth/validate-request";

export default async function Header() {
  const { user } = await validateRequest();

  return (
    <header className="mb-4 flex space-x-4 items-center px-2 py-4 border-b">
      <nav className="mr-auto">
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          Home
        </Link>
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "ghost" })}
        >
          Dashboard
        </Link>
      </nav>
      <ModeToggle />
      {user ? (
        <form action={logout}>
          <Button>Log out</Button>
        </form>
      ) : (
        <>
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" })}
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className={buttonVariants({ variant: "default" })}
          >
            Sign up
          </Link>
        </>
      )}
    </header>
  );
}
