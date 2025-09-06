'use client';
import {
  Users,
  Home,
  Settings,
  Package,
  CreditCard,
  ChartSpline,
  Shield,
  KeyRound,
  UserCheck,
} from 'lucide-react';
import Drawer from '@/components/drawer/Drawer';
import { ROUTES } from '@/constants';
import { NavUser } from './NavUser';

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  children?: MenuItem[];
};

const items: MenuItem[] = [
  {
    title: 'Home',
    url: ROUTES.HOME,
    icon: Home,
  },
  {
    title: 'Dashboard',
    url: ROUTES.ADMIN,
    icon: ChartSpline,
    disabled: true,
  },
  {
    title: 'Users',
    url: ROUTES.ADMIN_USERS,
    icon: Users,
    children: [
      {
        title: 'Roles',
        url: '/admin/users/roles',
        icon: Shield,
        disabled: true,
      },
      {
        title: 'Permissions',
        url: '/admin/users/permissions',
        icon: KeyRound,
        disabled: true,
      },
      {
        title: 'Active Users',
        url: ROUTES.ADMIN_USERS,
        icon: UserCheck,
      },
    ],
  },
  {
    title: 'Products',
    url: ROUTES.ADMIN_PRODUCTS,
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
  return <Drawer title="SM - Admin" Footer={<NavUser />} items={items} />;
}
