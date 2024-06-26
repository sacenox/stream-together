import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stream Together",
  description: "You and I, online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans text-stone-300 bg-stone-900">{children}</body>
    </html>
  );
}
