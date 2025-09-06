'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarFooter,
} from '@/components/ui/shadcn/sidebar';
import GeneralMenuItem from './GeneralMenuItem';
import { MenuItem } from '@/types';

export default function Drawer({
  title = '',
  items,
  Footer,
}: {
  title?: string;
  items: MenuItem[];
  Footer?: React.ReactNode;
}) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items?.map((item) => (
                <GeneralMenuItem key={item?.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{Footer}</SidebarFooter>
    </Sidebar>
  );
}
