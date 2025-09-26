'use client';

import { useSession } from 'next-auth/react';
import { formatInitials } from '@/utils/formatters/name.formatter';
import { Badge } from '@/components/ui/shadcn/badge';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/shadcn/avatar';

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col px-10">
      <div className="bg-[#2a2a2a] rounded-2xl my-5 p-8 shadow-md">
        <div className="flex items-start space-x-6">
          <Avatar className="w-24 h-24 flex-shrink-0">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108755-2616b612b3d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              alt="Natashia Khaleira"
            />
            <AvatarFallback className="text-3xl bg-white text-black">
              {formatInitials({
                firstName: session?.user?.first_name,
                lastName: session?.user?.last_name,
              })}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-3xl font-medium mb-6 text-white">
              {session?.user?.first_name} {session?.user?.last_name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-gray-400 text-sm mb-2">Role</p>
                <Badge>{session?.user?.role?.name}</Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Email Address</p>
                <p className="text-white text-sm">{session?.user?.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Phone Number</p>
                <p className="text-white text-sm">(+62) 812 3456-7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
