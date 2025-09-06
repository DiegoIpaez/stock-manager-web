'use client';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import {
  Users,
  Home,
  Settings,
  Package,
  CreditCard,
  LogOut,
  ChartSpline,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/shadcn/sidebar';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Dashboard',
    url: '/admin',
    icon: ChartSpline,
    disabled: true,
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: Users,
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: Package,
  },
  {
    title: 'Payments',
    url: '/admin/payments',
    icon: CreditCard,
    disabled: true,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
    disabled: true,
  },
];

export default function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SM Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item?.title}>
                  <SidebarMenuButton
                    className={clsx({
                      'opacity-50 cursor-not-allowed': item?.disabled,
                    })}
                    disabled={item?.disabled}
                    asChild
                  >
                    <a href={item?.url}>
                      <item.icon />
                      <span>{item?.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-red-600" asChild>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full flex items-center gap-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors px-3 py-2"
              >
                <LogOut />
                <span>Cerrar sesión</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
