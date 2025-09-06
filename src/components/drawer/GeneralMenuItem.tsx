'use client';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/shadcn/sidebar';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/shadcn/collapsible';
import type { MenuItem } from '@/types';

function SimpleMenuItem({ item }: { item: MenuItem }) {
  return (
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
  );
}

export default function GeneralMenuItem({ item }: { item: MenuItem }) {
  if (item?.children == null) return <SimpleMenuItem item={item} />;
  return (
    <Collapsible defaultOpen key={item.title} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className='cursor-pointer'>
            <item.icon />
            <span>{item?.title}</span>
            <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item?.children.map((sub) => (
              <SidebarMenuSubItem key={sub?.title}>
                <SidebarMenuButton
                  disabled={sub?.disabled}
                  className={clsx({
                    'opacity-50 cursor-not-allowed': sub?.disabled,
                  })}
                  asChild
                >
                  <a href={sub?.url}>
                    <sub.icon className="w-4 h-4" />
                    <span>{sub?.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
