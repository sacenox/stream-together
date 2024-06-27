import Link from "next/link";
import Logo from "../components/logo";
import PrimaryButton from "../components/primary-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 gap-20">
      <Logo />
      <Link href="/new">
        <PrimaryButton>Go live now!</PrimaryButton>
      </Link>
    </main>
  );
}
