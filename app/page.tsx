import Link from "next/link";

import Logo from "../components/logo";
import PrimaryButton from "../components/primary-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 gap-20">
      <Logo />
      <Link href="/new">
        <PrimaryButton>
          <p className="px-4 py-2 text-2xl">Go live now!</p>
        </PrimaryButton>
      </Link>
    </main>
  );
}
