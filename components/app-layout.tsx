import { FaHeart } from "react-icons/fa6";

import Header from "./header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-start h-screen gap-16 p-4">
      <Header />
      <div className="flex-grow">{children}</div>
      <p className="text-sm italic flex flex-row items-center justify-center justify-self-end gap-2">
        <span>Made with care by Sean</span>
        <span className="text-rose-400">
          <FaHeart size="1.25em" />
        </span>
      </p>
    </div>
  );
}
