import Image from "next/image";
import { pacifico } from "./pacifico-font";

export default function LogoSmall() {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <Image
        src="/stream-together.png"
        alt="Stream together brand"
        width={50}
        height={50}
        priority
      />
      <h2 className={`${pacifico.className} text-4xl text-stone-500`}>
        Steam Together
      </h2>
    </div>
  );
}
