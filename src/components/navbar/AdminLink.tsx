"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ROLES } from "@/constants";

export default function AdminLink() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session }: any = useSession();

  return (
    session?.user?.role?.name === ROLES.ADMIN && (
      <Link href="/admin" className="hover:underline p-1">
        Admin
      </Link>
    )
  );
}
