export default function PrimaryButton({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="text-rose-100 bg-rose-700 hover:bg-rose-900 border-b-8 active:border-b-0 active:border-t-8 border-t-rose-950 border-b-rose-950 font-bold rounded-t-lg active:rounded-t-xl rounded-b-xl shadow-sm shadow-stone-800 cursor-pointer text-center">
      {children}
    </div>
  );
}
