"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Navbar />
      <main>{children}</main>
    </SessionProvider>
  );
}
