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
      <p className="text-sm italic flex flex-row items-center justify-center justify-self-end">
        <span>Made with care by Sean</span>
        <span className="text-6xl pb-2 text-rose-400">&#x1F394;</span>
      </p>
    </div>
  );
}
