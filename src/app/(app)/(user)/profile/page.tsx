"use client";

import { UserRoundCog } from "lucide-react";
import { useSession } from "next-auth/react";
import Subtitle from "@/components/ui/typography/Subtitle";
import Title from "@/components/ui/typography/Title";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col px-10">
      <Title>Profile</Title>
      <div className="flex flex-col items-center justify-center mt-8">
        <UserRoundCog size={80} />
        <Subtitle>{session?.user?.name}</Subtitle>
        <p>({session?.user?.email})</p>
      </div>
    </div>
  );
}
