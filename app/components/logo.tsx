import { Pacifico } from "next/font/google";
import Image from "next/image";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

export default function Logo() {
  return (
    <div className="flex flex-col text-stone-500 pb-16 max-w-3xl">
      <div className="flex flex-row items-center justify-start gap-16">
        <Image
          src="/stream-together.png"
          alt="Stream together brand"
          width={100}
          height={100}
          priority
        />
        <h1 className={`${pacifico.className}  text-9xl`}>Steam Together</h1>
      </div>
      <p className="self-end text-xl font-light italic">You and I, Online!</p>
    </div>
  );
}
