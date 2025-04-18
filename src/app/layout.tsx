import type { Metadata } from "next";
import BaseProviders from "@/lib/BaseProviders";
import "./globals.css";


export const metadata: Metadata = {
  title: "عطر مولیان",
  description: "عطر مولیان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <body>
        <BaseProviders>
          {children}
        </BaseProviders>
      </body>
    </html>
  );
}
