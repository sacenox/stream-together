export default function PrimaryButton({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-rose-100 bg-rose-600 hover:bg-rose-900 border-b-8 active:border-b-0 active:border-t-8 border-t-rose-950 border-b-rose-950 font-bold text-2xl py-4 px-8 rounded-xl shadow-sm shadow-stone-800 cursor-pointer">
      {children}
    </div>
  );
}
