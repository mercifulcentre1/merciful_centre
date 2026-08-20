import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientRoot from "@/components/layout/ClientRoot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Merciful Centre",
  description: "Welcome to Merciful Centre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientRoot>{children}</ClientRoot>
      </body>
    </html>
  );
}
