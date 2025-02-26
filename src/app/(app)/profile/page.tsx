"use client";

import Subtitle from "@/components/ui/typography/Subtitle";
import Title from "@/components/ui/typography/Title";
import { UserRoundCog } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <UserRoundCog size={80} />
      <Title>{session?.user?.name}</Title>
      <Subtitle>({session?.user?.email})</Subtitle>
    </div>
  );
}
