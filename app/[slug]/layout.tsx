import AppLayout from "@/components/app-layout";

export default function StreamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
