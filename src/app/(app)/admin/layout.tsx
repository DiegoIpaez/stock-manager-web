import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/shadcn/sidebar';
import AdminSidebar from './_components/AdminSidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center border-b px-4 lg:px-6">
          <SidebarTrigger />
          <h2 className="ml-4 text-base font-medium">Admin Panel</h2>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </SidebarProvider>
  );
}
