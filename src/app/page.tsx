import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-4 flex flex-col">
      <h1>Hello World</h1>
      <Link href="/sign-up" className="mt-2 underline">
        Request an account
      </Link>
      <Link href="/login" className="mt-2 underline">
        Go to sign in
      </Link>
    </main>
  );
}
