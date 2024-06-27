export default function SecondaryButton({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-stone-300 bg-stone-700 hover:bg-stone-900 border-b-8 active:border-b-0 active:border-t-8 border-t-stone-950 border-b-stone-950 font-bold rounded-t-lg active:rounded-t-xl rounded-b-xl shadow-sm shadow-stone-800 cursor-pointer text-center">
      {children}
    </div>
  );
}
