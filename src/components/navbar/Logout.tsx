"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center justify-center bg-red-500 hover:bg-red-500-light rounded-full p-2"
    >
      <LogOut size={20} />
    </button>
  );
}
