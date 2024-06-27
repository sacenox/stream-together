import Image from "next/image";
import { pacifico } from "./pacifico-font";

export default function Logo() {
  return (
    <div className="flex flex-col text-stone-500 pb-16 max-w-xl">
      <div className="flex flex-row items-center justify-start gap-16">
        <Image
          src="/stream-together.png"
          alt="Stream together brand"
          width={100}
          height={100}
          priority
        />
        <h1 className={`${pacifico.className} text-8xl`}>Steam Together</h1>
      </div>
      <p className="self-end text-lg font-light italic">You and I, Online!</p>
    </div>
  );
}
